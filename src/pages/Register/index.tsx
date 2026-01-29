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
import { User, Mail, Lock } from 'lucide-react';
import { authService } from '@/services/authService';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      message.error('请填写所有必填字段');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    if (!formData.agreeTerms) {
      message.error('请阅读并同意服务条款');
      return;
    }

    setLoading(true);
    
    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Store token and user info (auto login)
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      message.success('注册成功');
      navigate('/');
    } catch (error: any) {
      console.error('Registration failed:', error);
      message.error(error.message || '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      logo={<img src={logo} alt="Logo" className="h-12 w-12" />}
      title="创建账号"
      subtitle="注册以开始分享和学习技能"
      footer={
        <span>
          已有账号？{' '}
          <a href="#" className="text-orange-500 hover:text-orange-600 font-medium" onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}>
            立即登录
          </a>
        </span>
      }
    >
      <Card className="shadow-xl border-0 p-6">
        <Form onSubmit={handleSubmit}>
          <FormItem label="姓名" required>
            <Input 
              placeholder="请输入您的姓名" 
              leftIcon={<User size={18} />}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </FormItem>

          <FormItem label="邮箱" required>
            <Input 
              placeholder="请输入您的邮箱" 
              type="email"
              leftIcon={<Mail size={18} />}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </FormItem>
          
          <FormItem label="密码" required>
            <InputPassword 
              placeholder="请输入密码"
              leftIcon={<Lock size={18} />}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </FormItem>

          <FormItem label="确认密码" required>
            <InputPassword 
              placeholder="请再次输入密码"
              leftIcon={<Lock size={18} />}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </FormItem>

          <div className="flex items-center mb-6">
            <Checkbox 
              label={
                <span className="text-sm text-gray-600">
                  我已阅读并同意 <a href="#" className="text-orange-500 hover:text-orange-600">服务条款</a> 和 <a href="#" className="text-orange-500 hover:text-orange-600">隐私政策</a>
                </span>
              }
              checked={formData.agreeTerms}
              onChange={(checked) => setFormData({...formData, agreeTerms: checked})}
            />
          </div>

          <Button type="submit" block loading={loading} size="lg">
            注册
          </Button>
        </Form>
      </Card>
    </AuthLayout>
  );
};
