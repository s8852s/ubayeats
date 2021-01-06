Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: { 
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations",
    sessions: "users/sessions"
  }

  devise_scope :user do
    post "/unique_email", to: "users/registrations#unique_email?"
  end
  
  resources :orders

  resource :carts do
    get :checkout
    collection do
      post :pay
      get :confirm
    end
  end
  # , only: [:show, :destroy] do
  #   post ':add_item/:id',aciton: 'add_item' 

  resources :rooms
  resources :messages

  resource :driver_profiles, path: '/drivers', only: [:new, :create, :edit, :update] do
    get :index
  end

  resource :store_profiles, path: '/stores'

  resources :store_profiles, as: 'stores', path: '/stores', only: [] do
    member do
      get :delicacy
    end
    collection do
      get :recommand
      get :search
      resource :orders, only: [:new] do
        get :preparing
        get :delivering
        get :record
      end
      resources :products, shallow: true do
        member do
          patch :toggle_publish
        end
      end
    end
  end

end
