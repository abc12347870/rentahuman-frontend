// 验证码接口：POST /api/send-code
import { NextResponse } from 'next/server';

// 模拟验证码存储（生产环境用Redis，这里临时用变量）
let codeStore = {};

export async function POST(request) {
  try {
    const { phone } = await request.json();
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ msg: '手机号格式错误' }, { status: 400 });
    }

    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // 存储验证码，5分钟过期
    codeStore[phone] = { code, expire: Date.now() + 5 * 60 * 1000 };
    
    // 模拟发送验证码（实际项目对接短信平台）
    console.log(`给${phone}发送验证码：${code}`);

    return NextResponse.json({ msg: '验证码发送成功' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: '服务器错误' }, { status: 500 });
  }
}