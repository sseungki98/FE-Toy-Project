from django.urls import path
from .views import ArticleListView, ArticleDetailView, CategoryListView

urlpatterns = [
    path("article", ArticleListView.as_view()),
    path("article/<int:pk>", ArticleDetailView.as_view()),
    path("category", CategoryListView.as_view())
]