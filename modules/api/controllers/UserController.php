<?php

namespace app\modules\api\controllers;


use Yii;
use yii\filters\Cors;
use yii\rest\Controller;
use app\modules\api\models\LoginForm;
use app\modules\api\models\SignupForm;
use yii\web\UnauthorizedHttpException;
use app\modules\api\resources\UserResource;

class UserController extends Controller
{
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            'cors' => Cors::class,
        ]);
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->login()) {
            return $model->getUser();
        }

        Yii::$app->response->statusCode = 422;
        return [
            'errors' => $model->errors
        ];
    }

    public function actionSignup()
    {
        $model = new SignupForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->register()) {
            return $model->_user;
        }

        Yii::$app->response->statusCode = 422;
        return [
            'errors' => $model->errors
        ];
    }

    public function actionGetData()
    {
        $headers = Yii::$app->request->headers;
        if (!isset($headers['Authorization'])){
            throw new UnauthorizedHttpException();
        }
        $accessToken = explode(" ", $headers['Authorization'])[1];
        $user = UserResource::findIdentityByAccessToken($accessToken);
        if (!$user){
            throw new UnauthorizedHttpException();
        }
        return $user;
    }
}