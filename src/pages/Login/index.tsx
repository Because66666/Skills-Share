import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Form, FormItem } from '@/components/molecules/Form';
import { Input } from '@/components/atoms/Input';
import { InputPassword } from '@/components/atoms/InputPassword';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Card } from '@/components/atoms/Card';
import { useMessage } from '@/components/feedback/Message';
import logo from '@/assets/images/logo.svg';
import { User, Lock } from 'lucide-react';
import { authService } from '@/services/authService';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      message.error('请输入用户名和密码');
      return;
    }

    setLoading(true);
    
    try {
      const response = await authService.login({
        username: formData.username,
        password: formData.password
      });

      // Store token and user info
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      message.success('登录成功');
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      message.error(error.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      logo={<img src={logo} alt="Logo" className="h-12 w-12" />}
      title="欢迎回来"
      subtitle="请登录您的账户以继续"
      footer={
        <span>
          还没有账号？{' '}
          <a href="#" className="text-orange-500 hover:text-orange-600 font-medium" onClick={(e) => {
            e.preventDefault();
            navigate('/register');
          }}>
            立即注册
          </a>
        </span>
      }
    >
      <Card className="shadow-xl border-0 p-6">
        <Form onSubmit={handleSubmit}>
          <FormItem label="邮箱" required>
            <Input 
              placeholder="请输入邮箱 (admin@example.com)" 
              leftIcon={<User size={18} />}
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </FormItem>
          
          <FormItem label="密码" required>
            <InputPassword 
              placeholder="请输入密码（password123）"
              leftIcon={<Lock size={18} />}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </FormItem>

          <div className="flex items-center justify-between mb-6">
            <Checkbox 
              label="记住我" 
              checked={formData.remember}
              onChange={(checked) => setFormData({...formData, remember: checked})}
            />
            <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium" onClick={(e) => e.preventDefault()}>
              忘记密码？
            </a>
          </div>

          <Button type="submit" block loading={loading} size="lg">
            登录
          </Button>
        </Form>
      </Card>
    </AuthLayout>
  );
};
