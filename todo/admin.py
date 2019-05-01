from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'description')
    list_display_links = ('id','user')
    list_filter = ('user',)
    search_fields = ('user__username__icontains', 'description')
    list_per_page = 20


admin.site.register(Task, TaskAdmin)