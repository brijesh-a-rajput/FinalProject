class ActivitiesController < ApplicationController
    before_action :authorize_request
  
    def index
      activities = @current_user.activities
      render json: activities
    end
  
    def create
      activity = @current_user.activities.new(activity_params)
      if activity.save
        render json: activity, status: :created
      else
        render json: activity.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def activity_params
      params.require(:activity).permit(:url, :path, :time_spent)
    end
  
    def authorize_request
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      decoded = JWT.decode(header, Rails.application.secrets.secret_key_base)[0]
      @current_user = User.find(decoded['user_id'])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { errors: 'Unauthorized' }, status: :unauthorized
    end
  end
  