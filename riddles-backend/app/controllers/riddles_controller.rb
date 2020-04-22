class RiddlesController < ApplicationController
  before_action :set_riddle, only: [:show, :update, :destroy]
 


  # GET /riddles
  def index
    @riddles = Riddle.all
     #@users = User.all

    render json: @riddles, include: [:user]
  end

  # GET /riddles/1
  def show
    render json: @riddle, include: [:user]
  end

  # POST /riddles
  def create
    @user = User.find_or_create_by(name: user_params[:name])
   # @riddle = Riddle.new(riddle_params)
   @riddle = @user.riddles.build(riddle_params)

    if @riddle.save
      render json: @riddle, include:[:user], status: :created #, except: [:user_id, :created_at, :updated_at],
    else
      render json: @riddle.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /riddles/1
  def update
    if @riddle.update(riddle_params)
      render json: @riddle
    else
      render json: @riddle.errors, status: :unprocessable_entity
    end
  end

  # DELETE /riddles/1
  def destroy
    @riddle.destroy
    render json:{
      message: "successfully destroyed"
    }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_riddle
      @riddle = Riddle.find(params[:id])
    end
   
    def user_params
      params.require(:user).permit(:name)
    end
    # Only allow a trusted parameter "white list" through.
    def riddle_params
      params.require(:riddle).permit(:content, :answer)
    end
end
