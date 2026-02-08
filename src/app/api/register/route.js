// 注册接口：POST /api/register
import { NextResponse } from 'next/server';

// 模拟用户数据库（生产环境用MySQL/MongoDB）
let users = {};
// 复用验证码存储
let codeStore = {};

export async function POST(request) {
  try {
    const { phone, code, password } = await request.json();

    // 验证参数
    if (!phone || !code || !password) {
      return NextResponse.json({ msg: '参数不能为空' }, { status: 400 });
    }

    // 验证验证码
    const storedCode = codeStore[phone];
    if (!storedCode || storedCode.code !== code || storedCode.expire < Date.now()) {
      return NextResponse.json({ msg: '验证码错误或已过期' }, { status: 400 });
    }

    // 检查手机号是否已注册
    if (users[phone]) {
      return NextResponse.json({ msg: '手机号已注册' }, { status: 400 });
    }

    // 注册用户（密码实际项目要加密，这里简化）
    users[phone] = { phone, password };
    // 清除验证码
    delete codeStore[phone];

    return NextResponse.json({ msg: '注册成功' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: '服务器错误' }, { status: 500 });
  }
}