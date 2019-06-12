class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :reviews

  has_one_attached :avatar  # ユーザーの画像とレコードを紐付ける

  validates :nickname, presence: true
end
