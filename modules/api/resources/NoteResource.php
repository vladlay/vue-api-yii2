<?php

namespace app\modules\api\resources;


use app\models\Note;

class NoteResource extends Note
{
    public $modelClass = NoteResource::class;
}