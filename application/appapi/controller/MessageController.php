<?php

namespace app\appapi\controller;

use think\Request;
use think\Validate;

class MessageController extends BaseController
{
    protected $middleware = ['AuthApp'];
    protected $header = []; //自定义response返回header

    public function getMessage(Request $request){
        $data['phone_num'] = input('post.phone');
        //校验手机号码
        $validate = Validate::make([
            'phone_num|手机号码' => 'require|number|min:5|max:15'
        ]);
        if (!$validate->check($data)) {
            return show('短信获取失败', $validate->getError(), 4000);
        }
        //获取短信
        $message_data = (new RedisController('sync'))->getLatestSMS($data['phone_num']);
        if ($message_data) {
            return show('获取成功', $message_data, 0, $request->header);
        }else{
            return show('短信获取失败，请稍候再试', '', 4000, $request->header);
        }
    }
}
