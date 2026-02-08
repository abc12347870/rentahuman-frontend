// 登录接口：POST /api/login
import { NextResponse } from 'next/server';

// 复用用户数据库和验证码存储
let users = {};
let codeStore = {};

export async function POST(request) {
  try {
    const { phone, code } = await request.json();

    // 验证参数
    if (!phone || !code) {
      return NextResponse.json({ msg: '参数不能为空' }, { status: 400 });
    }

    // 验证验证码
    const storedCode = codeStore[phone];
    if (!storedCode || storedCode.code !== code || storedCode.expire < Date.now()) {
      return NextResponse.json({ msg: '验证码错误或已过期' }, { status: 400 });
    }

    // 检查用户是否存在
    if (!users[phone]) {
      return NextResponse.json({ msg: '用户未注册' }, { status: 400 });
    }

    // 生成模拟token（实际项目用JWT）
    const token = `mock_token_${phone}`;
    // 清除验证码
    delete codeStore[phone];

    return NextResponse.json({ msg: '登录成功', token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: '服务器错误' }, { status: 500 });
  }
}