require 'test_helper'

class RiddlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @riddle = riddles(:one)
  end

  test "should get index" do
    get riddles_url, as: :json
    assert_response :success
  end

  test "should create riddle" do
    assert_difference('Riddle.count') do
      post riddles_url, params: { riddle: { answer: @riddle.answer, content: @riddle.content, user_id: @riddle.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show riddle" do
    get riddle_url(@riddle), as: :json
    assert_response :success
  end

  test "should update riddle" do
    patch riddle_url(@riddle), params: { riddle: { answer: @riddle.answer, content: @riddle.content, user_id: @riddle.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy riddle" do
    assert_difference('Riddle.count', -1) do
      delete riddle_url(@riddle), as: :json
    end

    assert_response 204
  end
end
