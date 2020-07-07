<?php

namespace app\modules\api\models;

use app\models\User;
use app\modules\api\resources\UserResource;

/**
 * LoginForm is the model behind the login form.
 *
 * @property User|null $user This property is read-only.
 *
 */
class SignupForm extends \app\models\LoginForm
{
    public $username;
    public $password;
    public $password_repeat;

    public $_user = false;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            ['username', 'unique', 
                'targetClass' => '\app\modules\api\resources\UserResource',
                'message' => 'This username has already been taken.'
            ],
            [['username', 'password', 'password_repeat'], 'required'],
            [['username', 'password', 'password_repeat'], 'required'],
            ['password', 'compare', 'compareAttribute' => 'password_repeat'],
        ];
    }


    public function register()
    {
        $this->_user = new UserResource();
        if ($this->validate()) {
            $security = \Yii::$app->security;
            $this->_user->username = $this->username;
            $this->_user->password_hash = $security->generatePasswordHash($this->password);
            $this->_user->access_token = $security->generateRandomString(255);
            if ($this->_user->save()) {
                return true;
            }
            return false;
        }
        return false;
    }
}
