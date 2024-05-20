Rails.application.routes.draw do
    resources :sessions, only: [:create]
    resources :activities, only: [:index, :create]
    resources :websites, only: [:index, :create, :update, :destroy]
  end
  