from django.db import models
from user.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="카테고리명")

    def __str__(self):
        return self.name

class Article(models.Model):
    author = models.ForeignKey(to=User, verbose_name="작성자", on_delete=models.CASCADE, related_name="article_user")
    title = models.CharField(max_length=100, verbose_name="제목")
    content = models.TextField(verbose_name="내용")
    image = models.FileField(null=True, blank=True)
    category = models.ForeignKey(to=Category, verbose_name="카테고리", on_delete=models.CASCADE, related_name="article_category")
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title