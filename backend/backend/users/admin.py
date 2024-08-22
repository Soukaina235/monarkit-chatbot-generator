from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser

class UserAdmin(BaseUserAdmin):
    model = CustomUser
    # Specify the fields you want to display in the admin interface
    list_display = ('email', 'company_name', 'activity', 'country', 'address', 'phone', 'is_staff', 'is_active')

    # Define which fields are editable in the admin
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Company info', {'fields': ('company_name', 'activity', 'country', 'address', 'phone', 'about')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'company_name', 'activity', 'country', 'address', 'phone')}
        ),
    )
    
    filter_horizontal = ()
    ordering = ('email',)
    list_filter = ('is_active', 'is_staff')
    search_fields = ('email',)

admin.site.register(CustomUser, UserAdmin)
