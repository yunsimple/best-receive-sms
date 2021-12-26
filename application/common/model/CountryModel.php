<?php

namespace app\common\model;


class CountryModel extends BaseModel
{
    protected $hidden = ['create_time', 'update_time', 'delete_time'];

    public function allData(){
        $result = self::where('show', '=', 1)
            ->order('bh', 'asc')
            ->select();
        return $result;
    }
    
    /*mys*/
    //查询国家
    public function findCountry($country){
        $result = self::where('en_title', '=', $country)
            ->where('show', '=', 1)
            ->cache('country_detail_' . $country, 3600, 'countryDetail')
            ->find();
        return $result;
    }

    //查询所有国家
    public function getAllCountry(){
        $result = self::where('show', '=', 1)
            ->order('sort', 'desc')
            ->cache(3600)
            ->paginate(12);
        return $result;
    }
    
    //APP 查询国家
    public function appGetCountry($page = 1, $limit = 10){
        $result = self::where('show', '=', 1)
            ->order('sort', 'desc')
            ->page($page, $limit)
            ->select();
        return $result->visible(['title','en_title', 'bh', 'id']);
    }
    
    //后台获取所有国家名称
    public function allDataName(){
        $result = self::order('sort', 'desc')
            ->column('id, title, bh');
        return $result;
    }
}