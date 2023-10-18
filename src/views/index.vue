<template>
  <el-container class="layout-container-demo" :height="inner_height">
    <el-aside width="250px" :height="table_height" :max-height="table_height">
      <div @click="return_index" style="cursor:pointer;height:60px;line-height:60px;font-size:large;">数据管理</div>
      <el-menu>
        <el-sub-menu index="1">
          <template #title>
            <el-text class="" size="large">慢性病</el-text>
          </template>
          <!-- 这里减去26是试出来的,也可以慢慢的推算出来 -->
          <el-scrollbar :max-height="table_height - 26">
            <el-menu-item-group>
              <el-menu-item ellipsis="true" @click="get_category(item.key, item.category_name)"
                v-for="(item, index) in category_disease_info" :key="index" :index="'1-' + index">
                {{ item.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-scrollbar>
        </el-sub-menu>
      </el-menu>
      <!-- </el-scrollbar> -->
    </el-aside>

    <el-container>
      <el-header style="text-align: right; height: {{container_head}}px; font-size: 16px">
        <span v-if="index_show" class="data_info">
          共采集
          <span style="font-weight: 600;">
            {{ resource_length }}
          </span>
          个数据源, 总计
          <span style="font-weight: 600;">
            {{ all_length }}
          </span>
          条数据
        </span>
        <span v-else class="data_info">
          数据源
          <span style="font-weight: 600;">
            {{ category_chName }}
          </span>
          , 总计
          <span style="font-weight: 600;">
            {{ category_length }}
          </span>
          条数据
        </span>
      </el-header>
      <el-main>
        <el-scrollbar v-if="index_show">
          <el-table v-loading="index_loading" text-align="left" border :data="category_info_array" :height="index_height"
            :max-height="index_height" fit>
            <el-table-column prop="name" label="表名" width="250" />
            <el-table-column prop="chName" label="中文名称" />
            <el-table-column prop="desc" label="描述" />
            <el-table-column prop="length" label="数据量" />
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button type="danger" size="small" @click="">
                  Remove
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <el-scrollbar v-else>
          <el-row class="row-bg" style="height:{{switch_paga_button_height}}px" justify="space-around">
            <el-col :span="4">
              <!-- <div class="grid-content ep-bg-purple" /> -->
              <el-button size="small" text="plain" v-show="!index_show" :height="add_button_height" :disabled="!popClick"
                @click="pop50">上一页</el-button>
            </el-col>
            <el-col :span="6" style="font-size:12px;">第 {{ page }} 页</el-col>
            <el-col :span="4">
              <!-- <div class="grid-content ep-bg-purple" /> -->
              <el-button size="small" text="plain" v-show="!index_show" :height="add_button_height" :disabled="!addClick"
                @click="add50">{{ category_data.length }}下一页</el-button>
            </el-col>
          </el-row>
          <!-- 美食天下 -->
          <!-- <el-table v-loading="loading" v-show="show_list.meishichina" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="图片">
              <template #default="{ row }">
                <img :src="row.menu_img" width="100" height="100">
              </template>
            </el-table-column>
            <el-table-column prop="intr" label="介绍" max-height="300" />
            <el-table-column prop="food_ingre.main" label="成分" />
            <el-table-column prop="step" width="400" label="步骤">
              <template #default="{ row }">
                <el-table :data="row.step" fit max-height="300">
                  <el-table-column prop="num" width="45" label="序号"></el-table-column>
                  <el-table-column prop="words" width="200" label="描述"></el-table-column>
                  <el-table-column label="图片">
                    <template #default="{ row }">
                      <img :src="row.img" width="100" height="100">
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="tips" label="小提示" />
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table> -->
          <!-- 豆果美食 -->
          <el-table v-loading="loading" v-show="show_list.douguo" border="true" :data="category_data"
            :height="table_height" :max-height="table_height">
            <el-table-column fixed type="index" label="序号" width="40" />
            <el-table-column prop="name" label="名称" width="100" />
            <el-table-column label="图片" width="120">
              <template #default="{ row }">
                <el-image :src="row.img" width="100" height="100" lazy />
              </template>
            </el-table-column>
            <el-table-column prop="intr" label="介绍" width="300" max-height="300" />
            <el-table-column prop="material" width="300" label="成分">
              <template #default="{ row }">
                <el-table :data="row.material" max-height="300">
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column prop="value" label="内容"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="step" width="500" label="步骤">
              <template #default="{ row }">
                <el-table :data="row.step" max-height="300">
                  <el-table-column prop="num" width="80" label="序号"></el-table-column>
                  <el-table-column prop="intr" width="250" label="描述"></el-table-column>
                  <el-table-column label="图片">
                    <template #default="{ row }">
                      <el-image :src="row.img" width="100" height="100" lazy />
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="tips" label="小提示" width="300" max-height="300" />
            <el-table-column fixed="right" label="操作" align="center" width="100">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 百度百科 -->
          <el-table v-loading="loading" v-show="show_list.baikebaidu" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="en_name" label="英语名称" />
            <el-table-column show-overflow-tooltip prop="summary" label="摘要" />
            <el-table-column show-overflow-tooltip prop="dis_intr" label="疾病介绍" />
            <el-table-column show-overflow-tooltip prop="clinical_feat" label="临床表现" />
            <el-table-column show-overflow-tooltip prop="etio" label="病因" />
            <el-table-column show-overflow-tooltip prop="diag" label="药物" />
            <el-table-column show-overflow-tooltip prop="treat" label="治疗" />
            <el-table-column show-overflow-tooltip prop="prev" label="预防" />
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- AI食疗 -->
          <el-table v-loading="loading" v-show="show_list.AIFoodTherapy" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="alias" label="别名">
              <template #default="{ row }">
                <span v-for="item in row.alias" :key="index">{{ item }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nutrient" width="600" label="成分">
              <template #default="{ row }">
                <el-table :data="row.nutrient" fit>
                  <el-table-column prop="name" width="100" label="名称"></el-table-column>
                  <el-table-column prop="alias" label="别名">
                    <template #default="{ row }">
                      <span v-for="item in row.alias" :key="index">{{ item }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="weight" label="权重" />
                </el-table>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 食物成分表 -->
          <el-table v-loading="loading" v-show="show_list.Supplements" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="alias" label="别名">
              <template #default="{ row }">
                <span v-for="item in row.alias" :key="index">{{ item }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 京东 -->
          <el-table v-loading="loading" v-show="show_list.searchjd" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column show-overflow-tooltip prop="name" label="名称" />
            <el-table-column label="商品图片">
              <template #default="{ row }">
                <img :src="row.img" width="100" height="100">
              </template>
            </el-table-column>
            <el-table-column prop="price" label="名称" />
            <el-table-column prop="commit" label="评论数" />
            <el-table-column prop="shop" label="商店名称" />
            <el-table-column prop="shop_url" label="商店链接" />
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 有来医生 -->
          <el-table v-loading="loading" v-show="show_list.youlai" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="title" label="名称" />
            <el-table-column show-overflow-tooltip prop="content" label="内容" />
            <el-table-column prop="link" label="链接" />
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 食物补充剂 -->
          <el-table v-loading="loading" v-show="show_list.foodNutritionFactsInquiry" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="category" label="类型" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="moisture" label="水分(g)" />
            <el-table-column prop="energy" label="能量(kcal)" />
            <el-table-column prop="protein" label="蛋白质(g)" />
            <el-table-column prop="fat" label="脂肪(g)" />
            <el-table-column prop="carbohydrates" label="碳水化合物(g)" />
            <el-table-column prop="dietary_fiber" label="膳食纤维(g)" />
            <el-table-column prop="cholesterol" label="胆固醇(mg)" />
            <el-table-column prop="ash_content" label="灰分(g)" />
            <el-table-column prop="va" label="维生素A(μgRE)" />
            <el-table-column prop="carotene" label="胡萝卜素(μg)" />
            <el-table-column prop="carotene" label="视黄醇(μg)" />
            <el-table-column prop="vb1" label="维生素B1(mg)" />
            <el-table-column prop="vb2" label="维生素B2(mg)" />
            <el-table-column prop="niacin" label="烟酸(mg)" />
            <el-table-column prop="vc" label="维生素C(mg)" />
            <el-table-column prop="ve" label="维生素E(mg)" />
            <el-table-column prop="calcium" label="钙(mg)" />
            <el-table-column prop="phosphorus" label="磷(mg)" />
            <el-table-column prop="potassium" label="钾(mg)" />
            <el-table-column prop="sodium" label="钠(mg)" />
            <el-table-column prop="magnesium" label="镁(mg)" />
            <el-table-column prop="iron" label="铁(mg)" />
            <el-table-column prop="zinc" label="锌(mg)" />
            <el-table-column prop="selenium" label="硒(μg)" />
            <el-table-column prop="copper" label="铜(mg)" />
            <el-table-column prop="manganese" label="锰(mg)" />
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 百度健康 -->
          <el-table v-loading="loading" v-show="show_list.baiduJianKang" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="department" label="所属科室" />
            <el-table-column show-overflow-tooltip prop="summary" label="概述" />
            <el-table-column show-overflow-tooltip prop="reason" label="病因" />
            <el-table-column show-overflow-tooltip prop="look_doc" label="就医" />
            <el-table-column show-overflow-tooltip prop="diag" label="诊断" />
            <el-table-column show-overflow-tooltip prop="cure" label="治疗" />
            <el-table-column show-overflow-tooltip prop="prog" label="预后" />
            <el-table-column show-overflow-tooltip prop="day" label="日常" />
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 食物升糖指数表 -->
          <el-table v-loading="loading" v-show="show_list.bloodSugar" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" width="70" />
            <el-table-column prop="key" label="名称" />
            <el-table-column prop="value" label="值" />
            <el-table-column prop="category" label="分类" />
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 慢病人员名单 -->
          <el-table v-loading="loading" v-show="show_list.list_of" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" />

            <el-table-column prop="name" label="名称" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="height" label="身高(厘米)" />
            <el-table-column prop="weight" label="体重(公斤)" />
            <el-table-column prop="region" label="地域" />
            <el-table-column prop="diet_habits" label="饮食习惯" />
            <el-table-column prop="rest_habits" label="作息习惯" />
            <el-table-column prop="sleep" label="睡眠(小时)" />
            <el-table-column prop="exercise" label="运动" />
            <el-table-column prop="chronic_disease" label="慢性病" />
            <el-table-column fixed="right" label="操作" align="center">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 北京会诊专家及所在医院 -->
          <el-table v-loading="loading" v-show="show_list.experts_hosp" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" />
            <!-- <el-table-column show-overflow-tooltip v-
              for="item in category_data_keys" :prop="item.prop" :label="item.prop"/> -->
            <el-table-column prop="position" label="诊断" />
            <el-table-column prop="depart" label="科室" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="hosp" label="医院" />
            <el-table-column fixed="right" label="操作" align="center">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 食物嘌呤含量 -->
          <el-table v-loading="loading" v-show="show_list.food_purine" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column label='含量单位为每100g食物中所含嘌呤的毫克量。嘌呤含量等级可分为：
                                    不宜选用 : > 150 mg/100g。
                                    急性期不宜选用 : 50 - 150 mg/100g。
                                    适宜选用 : < 50 mg/100g。'>
              <el-table-column fixed type="index" label="序号" />
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="purine_content" label="嘌呤含量(mg/100g)" />
              <el-table-column prop="category" label="类别" />
              <el-table-column prop="origin" label="样品地区" />
              <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" @click="delete_data(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 食物嘌呤种类 -->
          <el-table v-loading="loading" v-show="show_list.purine_category" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" />

            <el-table-column prop="name" label="名称" />
            <el-table-column prop="type" label="嘌呤种类" />
            <el-table-column fixed="right" label="操作" align="center">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 宏量营养素参考摄入量 -->
          <el-table v-loading="loading" v-show="show_list.macro_nutrient_reference_intake" border="true"
            :data="category_data" :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed label="a  %E为占能量的百分比。b  未制定参考值者用“-”表示。">
              <el-table-column fixed type="index" label="序号" />

              <el-table-column prop="people" label="人群" />
              <el-table-column prop="protein" label="蛋白质(g/d)/RNI">
                <template #default="{ row }">
                  <el-table :data="row.protein" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="carbohydrate" label="碳水化合物(%Ea)" />
              <el-table-column prop="add_suger" label="添加糖(%E)" />
              <el-table-column prop="total_fat" label="总脂肪(%E)" />
              <el-table-column prop="saturated_fat_acid" label="饱和脂肪酸(%E)" />
              <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" @click="delete_data(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 大模型推荐食材 -->
          <el-table v-loading="loading" v-show="show_list.recomm_ingred_LM" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column fixed type="index" label="序号" />
            <el-table-column prop="name" label="食材名称" />
            <el-table-column prop="recommend" label="推荐/不推荐" />
            <el-table-column prop="category" label="疾病" />
            <el-table-column fixed="right" label="操作" align="center">
              <template #default="scope">
                <el-button type="danger" @click="delete_data(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 维生素参考摄入量 -->
          <el-table v-loading="loading" v-show="show_list.intake_of_vitamins" border="true" :data="category_data"
            :height="table_height" :max-height="table_height">
            <el-table-column label='a  未制定参考值者用“-”表示。
                                    b  “+”表示在同龄人群参考值基础上额外增加量。
                                    c  视黄醇活性当量(RAE, μg)=膳食或补充剂来源全反式视黄醇(μg)+1/2补充剂纯品全反式β-胡萝卜素(μg)+1/12膳食全反式β-胡萝卜素(μg)+1/24其它膳食维生素A原类胡萝卜素(μg)。
                                    d  &alpha;-生育酚当量(&alpha;-TE, mg)，膳食中总&alpha;-TE当量(mg)=1&times;&alpha;-生育酚(mg)+0.5&times;β-生育酚(mg)+0.1&times;&gamma;-生育酚(mg)+0.02&times;δ-生育酚(mg)+0.3&times;&alpha;-三烯生育酚(mg)。
                                    e  叶酸当量(DEF, μg)=天然食物来源叶酸(μg)+1.7&times;合成叶酸(μg)。
                                    f  烟酸当量(NE, mg)=烟酸(mg)+1/60色氨酸(mg)。'>
              <el-table-column fixed type="index" label="序号" />
              <el-table-column prop="people" label="人群" width="150" />
              <el-table-column prop="vitaminA" label="维生素A(μg RAEc/RNI)" width="200">
                <template #default="{ row }">
                  <el-table :data="row.vitaminA" max-height="300" width="200">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="vitaminD" label="维生素D(μg/RNI)" width="150" />
              <el-table-column prop="vitaminE" label="维生素E(mg &alpha;-TEd AI)" width="150" />
              <el-table-column prop="vitaminK" label="维生素K(μg AI)" width="150" />
              <el-table-column prop="vitaminB1" label="维生素B1(mg/RNI)" width="200">
                <template #default="{ row }">
                  <el-table :data="row.vitaminB1" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="vitaminB2" label="维生素B2(mg/RNI)" width="200">
                <template #default="{ row }">
                  <el-table :data="row.vitaminB2" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="vitaminB6" label="维生素B6(mg RNI)" width="150" />
              <el-table-column prop="vitaminB12" label="维生素B12(μg RNI)" width="150" />
              <el-table-column prop="pantothenic_acid" label="泛酸(mg AI)" width="150" />
              <el-table-column prop="folic_acid" label="叶酸(μg DEFe RNI)" width="150" />
              <el-table-column prop="niacin" label="烟酸(mg NEf/RNI)" width="200">
                <template #default="{ row }">
                  <el-table :data="row.niacin" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="choline" label="胆碱(mg/AI)" width="200">
                <template #default="{ row }">
                  <el-table :data="row.choline" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="biotin" label="生物素(μg AI)" width="150" />
              <el-table-column prop="vitaminC" label="维生素C(mg RNI)" width="150" />
              <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" @click="delete_data(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 微量营养素可耐受最高摄入量 -->
          <el-table v-loading="loading" v-show="show_list.intake_of_micronutrient" border="true" :data="category_data"
            :height="table_height" :max-height="table_height">
            <el-table-column label='a  未制定UL值者用“-”表示。这些营养素未制定可耐受最高摄入量，主要是因为研究资料不充分，并不表示过量摄入没有健康风险。
                                    b  视黄醇活性当量(RAE, μg)=膳食或补充剂来源全反式视黄醇(μg)+1/2补充剂纯品全反式β-胡萝卜素(μg)+1/12膳食全反式β-胡萝卜素(μg)+1/24其它膳食维生素A原类胡萝卜素(μg)。
                                    c  &alpha;-生育酚当量(&alpha;-TE)，膳食中总&alpha;-TE当量(mg)=1&times;&alpha;-生育酚(mg)+0.5&times;β-生育酚(mg)+0.1&times;&gamma;-生育酚(mg)+0.02&times;δ-生育酚(mg)+0.3&times;&alpha;-三烯生育酚(mg)。
                                    d  烟酸当量(NE, mg)=烟酸(mg)+1/60色氨酸(mg)。
                                    e  指合成叶酸摄入量上限，不包括天然食物来源的叶酸量。'>
              <el-table-column fixed type="index" label="序号" width="60" />
              <el-table-column prop="people" label="人群" width="150" />
              <el-table-column prop="calcium" label="钙(mg)" width="150" />
              <el-table-column prop="phosphorus" label="磷(mg)" width="150" />
              <el-table-column prop="iron" label="铁(mg)" width="200" />
              <el-table-column prop="iodine" label="碘(μg)" width="150" />
              <el-table-column prop="zinc" label="锌(mg)" width="200" />
              <el-table-column prop="selenium" label="硒(μg)" width="150" />
              <el-table-column prop="copper" label="铜(mg)" width="150" />
              <el-table-column prop="fluorine" label="氟(mg)" width="150" />
              <el-table-column prop="manganese" label="锰(mg)" width="150" />
              <el-table-column prop="molybdenum" label="钼(μg)" width="150" />
              <el-table-column prop="vitaminA" label="维生素A(μg RAEb)" width="200" />
              <el-table-column prop="vitaminD" label="维生素D(μg)" width="150" />
              <el-table-column prop="vitaminE" label="维生素E(mg &alpha;-TEd)" width="150" />
              <el-table-column prop="vitaminB6" label="维生素B6(mg)" width="150" />
              <el-table-column prop="folic_acid" label="叶酸(μg)" width="150" />
              <el-table-column prop="niacin" label="烟酸(mg NEd)" width="200" />
              <el-table-column prop="nicotinamide" label="烟酰胺(mg)" width="200" />
              <el-table-column prop="choline" label="胆碱(mg)" width="200" />
              <el-table-column prop="vitaminC" label="维生素C(mg)" width="150" />
              <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" @click="delete_data(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 中国居民膳食水适宜摄入量 -->
          <el-table v-loading="loading" v-show="show_list.intake_of_water" border="true" :data="category_data"
            :height="table_height" :max-height="table_height" fit>
            <el-table-column label='a  温和气候条件下，轻体力活动水平。如果在高温或进行中等以上身体活动时，应适当增加水摄入量。
                                    b  总摄入量包括食物中的水以及饮水中的水。
                                    c  来自母乳。
                                    d  未制定参考值者用“-”表示。
                                    e  “+”表示在同龄人群参考值基础上额外增加量。'>
              <el-table-column fixed type="index" label="序号" width="60" />
              <el-table-column prop="people" label="人群" />
              <el-table-column prop="water_intake" label="饮水量a/(L/d)">
                <template #default="{ row }">
                  <el-table :data="row.water_intake" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="total_intake" label="总摄入量b/(L/d)">
                <template #default="{ row }">
                  <el-table :data="row.total_intake" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" @click="delete_data(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 中国居民膳食能量需要量 -->
          <el-table v-loading="loading" v-show="show_list.dietary_energy_requirement" border="true" :data="category_data"
            :height="table_height" :max-height="table_height">
            <el-table-column label='a  未制定参考值者用“-”表示。b  "+"表示在同龄人群参考值基础上额外增加量。'>
              <el-table-column fixed type="index" label="序号" width="60" />
              <el-table-column prop="people" label="人群" />
              <el-table-column prop="energy_MJ" label="能量(MJ/d)">
                <template #default="{ row }">
                  <el-table-column :prop="row.energy_MJ" label="身体活动水平(轻)" width="250" max-height="300">
                    <template #default="{ row }">
                      <el-table :data="row.energy_MJ.activity_level_low" max-height="300">
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="value" label="值"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>

                  <el-table-column :prop="row.energy_MJ" label="身体活动水平(中)" width="250" max-height="300">
                    <template #default="{ row }">
                      <el-table :data="row.energy_MJ.activity_level_medium" max-height="300">
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="value" label="值"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>

                  <el-table-column :prop="row.energy_MJ" label="身体活动水平(重)" width="250" max-height="300">
                    <template #default="{ row }">
                      <el-table :data="row.energy_MJ.activity_level_high" max-height="300">
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="value" label="值"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
              <el-table-column prop="energy_KCAL" label="能量(kcal/d)EER">
                <template #default="{ row }">
                  <el-table-column :prop="row.energy_KCAL" label="身体活动水平(轻)" width="250" max-height="300">
                    <template #default="{ row }">
                      <el-table :data="row.energy_KCAL.activity_level_low" max-height="300">
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="value" label="值"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>

                  <el-table-column :prop="row.energy_KCAL" label="身体活动水平(中)" width="250" max-height="300">
                    <template #default="{ row }">
                      <el-table :data="row.energy_KCAL.activity_level_medium" max-height="300">
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="value" label="值"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>

                  <el-table-column :prop="row.energy_KCAL" label="身体活动水平(重)" width="250" max-height="300">
                    <template #default="{ row }">
                      <el-table :data="row.energy_KCAL.activity_level_high" max-height="300">
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="value" label="值"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" @click="delete_data(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 矿物质参考摄入量 -->
          <el-table v-loading="loading" v-show="show_list.intake_of_minerals" border="true" :data="category_data"
            :height="table_height" :max-height="table_height">
            <el-table-column label='a  未制定参考值者用“-”表示。b  “+”表示在同龄人群参考值基础上额外增加量。'>
              <el-table-column fixed type="index" label="序号" />
              <el-table-column prop="people" label="人群" width="150" />
              <el-table-column prop="calcium" label="钙(mg)RNI" width="150" />
              <el-table-column prop="phosphorus" label="磷(mg)RNI" width="150" />
              <el-table-column prop="potassium" label="钾(mg)AI" width="150" />
              <el-table-column prop="sodium" label="钠(mg)AI" width="150" />
              <el-table-column prop="magnesium" label="镁(mg)RNI" width="150" />
              <el-table-column prop="chlorine" label="氯(mg)AI" width="150" />
              <el-table-column prop="iron" label="铁(mg)/RNI" width="200">
                <template #default="{ row }">
                  <el-table :data="row.iron" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="iodine" label="碘(μg)RNI" width="150" />
              <el-table-column prop="zinc" label="锌(mg)/RNI" width="200">
                <template #default="{ row }">
                  <el-table :data="row.zinc" max-height="300">
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="value" label="值"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="selenium" label="硒(μg)RNI" width="150" />
              <el-table-column prop="copper" label="铜(mg)RNI" width="150" />
              <el-table-column prop="fluorine" label="氟(mg)AI" width="150" />
              <el-table-column prop="chromium" label="铬(μg)AI" width="150" />
              <el-table-column prop="manganese" label="锰(mg)AI" width="150" />
              <el-table-column prop="molybdenum" label="钼(μg)RNI" width="150" />
              <el-table-column fixed="right" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" @click="delete_data(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { auto, end } from '@popperjs/core';
import { entries } from 'lodash';
let site_prop = require('../site_prop.js')
import QueryString from 'qs';
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch, watchEffect } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
// import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
export default {
  setup() {
    // 设置当前页面的中文名称
    const category_chName = ref("")
    // 设置当前页面的数据长度
    const category_length = ref("")
    // 设置谁显示,谁不显示
    const show_list = reactive(site_prop.show_list)
    // 当前的key
    const current_key = ref("")
    // 定义当前页面是哪个数据源
    const resource_type = ref("")
    // 数据源数据
    const category_info = ref([])
    const category_name = ref("")
    const category_disease_info = ref([])
    const category_policy_info = ref([])
    // 具体某个数源的数据
    const category_data = ref([])
    const category_data_str = ref([])
    // 实际使用的数据源数据
    const category_info_array = ref([])
    // 数据量信息
    const resource_length = ref(0)
    const all_length = ref(0)
    const base_url = 'http://39.96.138.111:7777/'
    // const base_url = 'http://localhost:5000/'
    // 用于分页
    const start = ref(0)
    // 用于分页
    const end = ref(49)
    // 第几页
    const page = ref(1)
    // 控制首页的表格显示
    const index_show = ref(true)
    // 测试一下获取各种头
    // 每个数据源表头数据
    const category_data_keys = ref([])
    // 判断是否载入加载动画,目前只有每次点击换表的时候使用到
    const loading = ref(false)
    // 首页列表
    const index_loading = ref(false)
    // 设置整个容器的高度为innerheight
    const container_height = ref(window.innerHeight)
    const inner_height = computed(() => {
      return container_height.value - 16
    })
    const container_head = ref(60)
    const switch_paga_button_height = ref(30)
    // 动态设置e-table的高度
    const index_height = computed(() => {
      return container_height.value - 16 - container_head.value
    })
    const table_height = computed(() => {
      return container_height.value - container_head.value - 16 - switch_paga_button_height.value
    })
    // 表格滚动到底部之后出现加载图标
    // const noMore = computed(() =>  >= 20)
    // const disabled = computed(() => loading.value || noMore.value)  
    const add_button_height = ref(50)
    // 前一页点击
    const popClick = computed(() => {
      return start.value - 49 >= 0
    })
    const addClick = computed(() => {
      return end.value >= 49 && category_data.value.length == 50
    })

    function get_category(key, category) {
      if (key === current_key) {
        get_category_info(key, category)
      } else {
        switch (current_key.value) {
          case "ChronicDisease_home.meishichina.com":
            show_list.meishichina = false
            break
          case "ChronicDisease_baike.baidu.com":
            show_list.baikebaidu = false
            break
          case "ChronicDisease_foodwake_AIFoodTherapy":
            show_list.AIFoodTherapy = false
            break
          case "ChronicDisease_foodwake_Supplements":
            show_list.Supplements = false
            break
          case "ChronicDisease_search.jd.com":
            show_list.searchjd = false
            break
          case "ChronicDisease_www.youlai.cn":
            show_list.youlai = false
            break
          case "ChronicDisease_eshian_foodNutritionFactsInquiry_excel":
            show_list.foodNutritionFactsInquiry = false
            break
          case "ChronicDisease_baiduJianKang":
            show_list.baiduJianKang = false
            break
          case "ChronicDisease_douguo":
            show_list.douguo = false
            break
          case "ChronicDisease_bloodSugar":
            show_list.bloodSugar = false
            break
          case "ChronicDisease_list_of":
            show_list.list_of = false
            break
          case "ChronicDisease_experts_hosp":
            show_list.experts_hosp = false
            break
          case "ChronicDisease_food_purine":
            show_list.food_purine = false
            break
          case "ChronicDisease_purine_category":
            show_list.purine_category = false
            break
          case "ChronicDisease_macro_nutrient_reference_intake":
            show_list.macro_nutrient_reference_intake = false
            break
          case "ChronicDisease_recomm_ingred_LM":
            show_list.recomm_ingred_LM = false
            break
          case "ChronicDisease_reference_intake_of_vitamins":
            show_list.intake_of_vitamins = false
            break
          case "ChronicDisease_maximum_tolerable_intake_of_micronutrient":
            show_list.intake_of_micronutrient = false
            break
          case "ChronicDisease_intake_of_water":
            show_list.intake_of_water = false
            break
          case "ChronicDisease_dietary_energy_requirement":
            show_list.dietary_energy_requirement = false
            break
          case "ChronicDisease_reference_intake_of_minerals":
            show_list.intake_of_minerals = false
            break


        }
        get_category_info(key, category)
        // 设置新的当前key
        current_key.value = key
      }
    }

    function get_category_info(key, category) {
      const data = {
        key: key,
        category_name: category,
        start: 0,
        end: 49
      }
      loading.value = true
      index_show.value = false
      axios.post(base_url + "get_cate_data", QueryString.stringify(data), {}).then(res => {
        // 每次切换数据源page都要回到第一页
        page.value = 1
        category_name.value = category
        // 清空数据
        category_data.value.splice(0, category_data.value.length)
        category_data_keys.value.splice(0, category_data_keys.value.length)
        start.value = 0
        end.value = 49
        // 处理当前分类的数据长度
        category_length.value = res.data.length
        // 设置当前分类的中文名称
        for (let i of category_disease_info.value) {
          if (i.key === key) {
            category_chName.value = i.name
            break
          }
        }
        // 开始处理展示的数据
        for (let i of res.data.data) {
          // console.log(i)
          let temp = JSON.parse(i)
          category_data.value.push(temp)
          // 将字符串也保存进去
          category_data_str.value.push(i)
        }
        console.log(category_data.value)
        // const keys = category_data.value[0]
        // const temp_title = Object.keys(keys)
        // for (let i of temp_title) {
        //   // console.log(i)
        //   const temp = {}
        //   temp.prop = i
        //   temp.label = "ziduan"
        //   category_data_keys.value.push(temp)
        // }
        switch (data.key) {
          case "ChronicDisease_home.meishichina.com":
            show_list.meishichina = true
            break
          case "ChronicDisease_baike.baidu.com":
            show_list.baikebaidu = true
            break
          case "ChronicDisease_foodwake_AIFoodTherapy":
            show_list.AIFoodTherapy = true
            break
          case "ChronicDisease_foodwake_Supplements":
            show_list.Supplements = true
            break
          case "ChronicDisease_search.jd.com":
            show_list.searchjd = true
            break
          case "ChronicDisease_www.youlai.cn":
            show_list.youlai = true
            break
          case "ChronicDisease_eshian_foodNutritionFactsInquiry_excel":
            show_list.foodNutritionFactsInquiry = true
            break
          case "ChronicDisease_baiduJianKang":
            show_list.baiduJianKang = true
            break
          case "ChronicDisease_douguo":
            show_list.douguo = true
            break
          case "ChronicDisease_bloodSugar":
            show_list.bloodSugar = true
            break
          case "ChronicDisease_list_of":
            show_list.list_of = true
            break
          case "ChronicDisease_experts_hosp":
            show_list.experts_hosp = true
            break
          case "ChronicDisease_food_purine":
            show_list.food_purine = true
            break
          case "ChronicDisease_purine_category":
            show_list.purine_category = true
            break
          case "ChronicDisease_macro_nutrient_reference_intake":
            show_list.macro_nutrient_reference_intake = true
            break
          case "ChronicDisease_recomm_ingred_LM":
            show_list.recomm_ingred_LM = true
            break
          case "ChronicDisease_reference_intake_of_vitamins":
            show_list.intake_of_vitamins = true
            break
          case "ChronicDisease_maximum_tolerable_intake_of_micronutrient":
            show_list.intake_of_micronutrient = true
            break
          case "ChronicDisease_intake_of_water":
            show_list.intake_of_water = true
            break
          case "ChronicDisease_dietary_energy_requirement":
            show_list.dietary_energy_requirement = true
            break
          case "ChronicDisease_reference_intake_of_minerals":
            show_list.intake_of_minerals = true
            break


        }
        loading.value = false
        resource_type.value = key
      })
    }

    // 每5分钟请求一次数据长度
    setInterval(() => {
      axios.post(base_url + 'get_length_info', QueryString.stringify({}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        all_length.value = res.data.all_length
        resource_length.value = res.data.resource_length
      }).catch(err => {
        console.log(err)
      })
    }, 60000 * 5)

    // 下一页
    const add50 = () => {
      // if(category_data.value.length<=50){
      const data = {
        key: resource_type.value,
        category_name: category_name.value,
        start: end.value,
        end: end.value + 49
      }
      console.log('增加前', start.value, end.value)
      get_cate_data(data)
      start.value = end.value
      end.value = end.value + 49
      console.log("add", start.value, end.value)
      // 页数加一
      page.value++
      // }
    }
    // 上一页
    const pop50 = () => {
      // if(category_data.value.length<=50){
      console.log(category_name.value)
      const data = {
        key: resource_type.value,
        category_name: category_name.value,
        start: start.value - 49,
        end: start.value
      }
      console.log("删除前", start.value, end.value)
      get_cate_data(data)
      end.value = start.value
      start.value = start.value - 49
      // 页数减1
      page.value--
      console.log("pop", start.value, end.value)
    }

    const get_cate_data = (data) => {
      loading.value = true
      axios.post(base_url + "get_cate_data", QueryString.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // 将数据添加到cate_data的最下面,以及将字符串添加到cate_data_str的最下面
        // 清空数据
        category_data.value.splice(0, category_data.value.length)
        category_data_str.value.splice(0, category_data_str.value.length)
        // category_data_keys.value.splice(0,category_data_keys.value.length)
        // 处理当前分类的数据长度
        category_length.value = res.data.length
        // 开始处理展示的数据
        for (let i of res.data.data) {
          // console.log(i)
          let temp = JSON.parse(i)
          // temp.policy_content = temp.policy_content.substring(0, 100)
          // console.log(temp.policy_content)
          category_data.value.push(temp)
          // 将字符串也保存进去
          category_data_str.value.push(i)
        }
        loading.value = false
      }).catch(err => {
        console.log(err)
      })
    }


    const delete_data = (index) => {
      const del_value = computed(() => {
        return category_data_str.value[index]
      })
      // 执行删除逻辑
      // key 从resource_type获取,具体的数据可以从category_data.value中获取到
      console.log(category_name.value, index, resource_type.value, 1, del_value.value)
      delete_data_in_redis(category_name.value, index, resource_type.value, 1, del_value.value)
    }

    const delete_data_in_redis = (category, index, key, count, value) => {
      loading.value = true
      console.log(value)
      const data = {
        category_name: category,
        key: key,
        count: count,
        del_value: value
      }
      axios.post(base_url + "del", QueryString.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // 弹出删除成功的消息,并且将以上的列表中该列数据删除,要求要loading
        let del_state = res.data.state
        let del_message = res.data.message

        if (del_state == 200) {
          ElMessage.success({
            showClose: true,
            message: del_message,
            center: true,
            grouping: true
          })
          // 去掉浏览器上的该值
          category_data.value.splice(index, 1)
          // 去掉删除数组中的该值
          category_data_str.value.splice(index, 1)
        } else {
          ElMessage.error({
            showClose: true,
            message: del_message,
            center: true,
            grouping: true
          })
        }
        loading.value = false
      }).catch(err => {
        // 弹出删除失败的消息
        ElMessage.error({
          showClose: true,
          message: '执行删除操作失败',
          center: true,
          grouping: true
        })
        loading.value = false
      })
    }


    const return_index = () => {
      // 将index_show设置为true
      index_show.value = true
    }

    const get_cate_data_list = () => {
      for (let i of category_info.value) {
        const temp = {}
        temp.name = i.key
        temp.chName = i.name
        temp.desc = i.desc
        temp.length = i.length
        category_info_array.value.push(temp)
      }
      console.log(category_info_array.value)
      // setTimeout(()=>{index_loading.value = false},3000)
    }

    onMounted(() => {
      //用来获取所有的总长度以及所有的小分类和大分类
      index_loading.value = true
      axios.get(base_url + "init_info").then(res => {
        console.log(res.data)
        category_info.value = res.data.resource
        for (let i of res.data.resource) {
          if (i.category_name == "disease") {
            category_disease_info.value.push(i)
          } else {
            category_policy_info.value.push(i)
          }
        }
        console.log(category_disease_info.value)
        // 它里面不是数组,是一个对象,key是每个对应的场景,比如慢性病,数据是数据源个数和总个数
        // data_volume = makeReactive(res.data.data_volume)
        // console.log(data_volume.value)
        resource_length.value = res.data.resource_length
        all_length.value = res.data.all_length
        console.log(resource_length, all_length)
        get_cate_data_list()
        index_loading.value = false
      }).catch(err => {
        console.log(err)
      })
    })

    const updateInnerHeight = () => {
      container_height.value = window.innerHeight
    }
    onMounted(() => {
      window.addEventListener('resize', updateInnerHeight)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', updateInnerHeight)
    })


    function makeReactive(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return obj
      }

      if (Array.isArray(obj)) {
        return obj.map(makeReactive)
      }

      const reactiveObj = reactive({})

      for (const key in obj) {
        reactiveObj[key] = makeReactive(obj[key])
      }

      return reactiveObj
    }

    return {
      category_info,
      category_data: category_data.value,
      category_name: category_name.value,
      category_data_keys: category_data_keys.value,
      category_disease_info: category_disease_info.value,
      category_policy_info: category_policy_info.value,
      category_info_array: category_info_array.value,
      table_max_height: "500px",
      table_height,
      index_show,
      loading,
      page,
      category_length,
      category_chName,
      show_list,
      current_key: current_key.value,
      resource_length,
      all_length,
      add_button_height: add_button_height.value,
      index_loading,
      container_height: container_height.value,
      table_height: table_height.value,
      add50,
      switch_paga_button_height: switch_paga_button_height.value,
      popClick,
      addClick,
      container_head,
      index_height,
      inner_height: inner_height.value,
      pop50,
      delete_data,
      return_index,
      get_category_info: get_category_info,
      get_category,
    }
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

#app {
  height: 100vh;
}

.data_info {
  display: inline-flex;
  height: 100%;
  width: 100%;
  font-size: 16px;
  text-align: left;
  line-height: 60px;
}

.example-showcase .el-loading-mask {
  z-index: 9;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  /* color: var(--el-text-color-primary); */
}

.layout-container-demo .el-aside {
  /* color: var(--el-text-color-primary); */
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 40px;
  width: 10%;
}

.el-menu-item-group__title {
  text-align: center;
}

.el-row {
  height: 30px;
  line-height: 30px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>