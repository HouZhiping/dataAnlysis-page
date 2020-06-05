<template>
  <div class="demo-list">
    <nut-noticebar :closeMode="true" v-if="!isMobile"
      >此 Demo 在 PC 端浏览器与移动端浏览器体验差异较大，建议在 Android 或 iOS
      设备上体验。
    </nut-noticebar>
    <nut-row>
      <nut-col :offset="6" :span="12">
        <h4 @click="backUp">基本用法</h4>
      </nut-col>
    </nut-row>

    <!--<nut-button type="lightred" small>去结算</nut-button>-->
    <nut-cell :showIcon="true" @click.native="switchPicker('isVisible')">
      <span slot="title"><label>日期选择</label></span>
      <span slot="sub-title">没有默认日期~~~</span>
      <div slot="desc" class="selected-option">
        <span class="show-value">{{
          date ? `${date} ${dateWeek}` : "请选择日期"
        }}</span>
      </div>
    </nut-cell>
    <nut-cell
      :showIcon="true"
      :isLink="true"
      @click.native="switchPicker('isVisible2')"
    >
      <span slot="title"><label>日期选择</label></span>
      <span slot="sub-title">有默认日期，选择后自动回填的~~~</span>
      <div slot="desc" class="selected-option">
        <span class="show-value">{{ date2 ? date2 : "请选择日期" }}</span>
      </div>
    </nut-cell>
    <nut-cell
      :showIcon="true"
      :isLink="true"
      @click.native="switchPicker('isVisible1')"
    >
      <span slot="title"><label>日期区间选择</label></span>
      <span slot="sub-title">有默认日期~~~</span>
      <div slot="desc" class="selected-option">
        <span class="show-value">{{
          date1 ? `${date1[0]}至${date1[1]}` : "请选择日期"
        }}</span>
      </div>
    </nut-cell>
    <nut-cell
      :showIcon="true"
      :isLink="true"
      @click.native="switchPicker('isVisible3')"
    >
      <span slot="title"><label>日期区间选择</label></span>
      <span slot="sub-title">不限制开始结束时间~~~</span>
      <div slot="desc" class="selected-option">
        <span class="show-value">{{
          date3 ? `${date3[0]}至${date3[1]}` : "请选择日期"
        }}</span>
      </div>
    </nut-cell>
    <br />
    <nut-cell
      :showIcon="true"
      :isLink="true"
      @click.native="switchPicker('isVisible4')"
    >
      <span slot="title">
        <label>年选择</label>
      </span>
      <span slot="sub-title">单列~~~</span>
      <div slot="desc" class="selected-option">
        <span class="btn" @click.stop.prevent="modifyYear"
          >修改为指定的年份</span
        >
        <span class="show-value">{{ year ? year : "请选择" }}</span>
      </div>
    </nut-cell>
    <br />
    <nut-cell>
      <span slot="title">
        <nut-textinput
          v-model="val"
          label="基本用法："
          placeholder="请输入内容"
        />
      </span>
    </nut-cell>

    <!-- demo-->
    <nut-calendar
      :is-visible.sync="isVisible"
      :default-value="date"
      @close="switchPickerClose('isVisible')"
      @choose="setChooseValue"
      :start-date="`2018-10-11`"
      :end-date="`2020-11-11`"
    >
    </nut-calendar>
    <nut-calendar
      :is-visible.sync="isVisible2"
      :default-value="date2"
      :is-auto-back-fill="true"
      @close="switchPickerClose('isVisible2')"
      @choose="setChooseValue2"
    >
    </nut-calendar>
    <nut-calendar
      :is-visible.sync="isVisible1"
      :default-value="date1"
      type="range"
      :start-date="null"
      :end-date="null"
      @close="switchPickerClose('isVisible1')"
      @choose="setChooseValue1"
    >
    </nut-calendar>
    <nut-calendar
      :is-visible.sync="isVisible3"
      :default-value="date3"
      type="range"
      :start-date="null"
      :end-date="null"
      @close="switchPickerClose('isVisible3')"
      @choose="setChooseValue3"
    >
    </nut-calendar>
    <!-- demo 年选择-->
    <nut-picker
      :is-visible="isVisible4"
      :default-value-data="defaultValueData1"
      :list-data="listData1"
      @close="switchPickerClose('isVisible4')"
      @confirm="setYearValue"
    ></nut-picker>
  </div>
</template>

<script>
import Utils from "src/utils/date.js";
export default {
  data() {
    return {
      isMobile: true,
      isVisible: false,
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
      date: null,
      dateWeek: null,
      date1: ["2018-12-22", "2019-01-08"],
      date2: Utils.getDay(0),
      date3: null,
      year: null,
      defaultValueData1: ["2020"],
      listData1: [["2018", "2019", "2010"]],
      val: "",
    };
  },
  methods: {
    backUp() {
      this.$router.push("/grid");
      console.log(999999);
    },
    switchPickerClose(param) {
      this[`${param}`] = !this[`${param}`];
      console.log("close:" + param);
    },
    switchPicker(param) {
      this[`${param}`] = true;
    },
    setChooseValue(param) {
      this.date = param[3];
      this.dateWeek = param[4];
    },
    setChooseValue1(param) {
      this.date1 = [...[param[0][3], param[1][3]]];
    },
    setChooseValue2(param) {
      this.date2 = param[3];
    },
    setChooseValue3(param) {
      this.date3 = [...[param[0][3], param[1][3]]];
    },
    setChooseValue4(param) {},
    setChooseValue5(param) {},
    setYearValue(chooseData) {
      this.year = `${chooseData[0]}年`;
    },
    modifyYear() {
      this.defaultValueData1 = ["2018"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
