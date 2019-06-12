TechReviewSite::Application.routes.draw do
  devise_for :users
  resources :users, only: :show
  resources :products, only: :show do
    resources :reviews, only: [:new, :create]
    collection do  # Rails7つのアクション以外のアクション名を定義
      get 'search'  # searchアクションを定義
    end
  end
  root 'products#index'

end
