class StoresController < ApplicationController
  before_action :session_required, only: [:new, :create]
  before_action :set_store, only: [:index, :edit, :update]
  before_action :store_pundit, only: [:index, :edit, :update]

  def index
  end

  def delicacy
    user = User.find_by!(id: params[:id])
    @store_profile = user.store_profile
    @products = user.products
  end
  
  def new
    @store_profile = StoreProfile.new
  end

  def create
    @store_profile = current_user.create_store_profile(params_store)
    if @store_profile.save
      current_user.become_store!
      redirect_to root_path, notice: '成為合作店家'
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  def search
    @keyword = params[:keyword]
    @stores = StoreProfile.where("lower(store_name) || store_type LIKE ?", "%#{@keyword.downcase}%")
  end

  def recommand
    @store_profiles = StoreProfile.all
    render json: @store_profiles
  end

  private
  def params_store
    params.require(:store_profile).permit(:store_certificate, :store_photo, :store_name, :store_type, :store_mail, :store_address, :store_phone, :account)
  end

  def store_pundit
    authorize current_user, :start_business
  end

  def set_store
    @store_profile = current_user.store_profile
  end
         
end
