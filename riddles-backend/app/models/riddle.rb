class Riddle < ApplicationRecord
  belongs_to :user

  validates :content, presence: true
  validates :answer, presence: true
end
