Rails.application.routes.draw do
  devise_for :users, controllers: { 
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations",
    sessions: "users/sessions" 
  }
  root 'home#index'
  
  resource :stores do 
    resource :orders, only: [:new] do
      get :preparing
      get :delivering
      get :record
    end
    collection do
      get :index
    end
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
  resource :drivers do
    get :index
  end

  resource :stores, only: [:show, :edit, :update] do
    resources :products, shallow: true, only: [:show, :new, :create, :edit, :update, :destroy] do
      collection do
        get :index
      end
      member do
        patch :toggle_publish
      end
    end
  end
end
