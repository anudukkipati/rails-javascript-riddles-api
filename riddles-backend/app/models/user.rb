class User < ApplicationRecord
    has_many :riddles

    validates :name, presence: true, uniqueness: true
end
