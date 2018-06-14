<template>
    <div class="content">

        <Row>
            <Col>
                <h5>{{username}}近期出勤情况</h5>
            </Col>
            <Col>
                <Table :columns="columns1" :data="inforList1"></Table>
            </Col>
        </Row>

        <Row>
            <Col>
                <h5>{{username}}近期考勤统计（不含当天）</h5>
            </Col>
            <Col>
                <Table :columns="columns" :data="inforList"></Table>
            </Col>
        </Row>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',

        columns: [
          {
            title: '类别',
            key: 'type',
          },
          {
            title: '次数',
            key: 'time',
          },
        ],
        inforList: [
          {
            type: '缺勤',
            time: '',
          }, {
            type: '出勤',
            time: '',
          }, {
            type: '请假',
            time: '',
          }, {
            type: '早退',
            time: '',
          }, {
            type: '出差',
            time: '',
          },
        ],

        columns1: [
          {
            title: '日期',
            key: 'year',
          },
          {
            title: '签到时间',
            key: 'beginTime',
          },
          {
            title: '签退时间',
            key: 'endTime',
          },
        ],
        inforList1: [],
      };
    },
    components: {},
    methods: {},
    created() {
      let that = this;

      // 将数据放在当前组件的数据内
      this.username = this.$route.params.data.username;
      // console.log(this.$route.params.data.username, 'data');

      this.$axiso.get('http://localhost:8081/admin/attendances/' + this.$route.params.data.id, {
        headers: {
          'token': this.$store.getters.token,
        },
        withCredentials: true,
      }).then((response) => {
        if (response.data.code === 200) {
          let data = response.data.data;
          for (let key in data) {
            data[key].year = data[key].year + '-' + data[key].month + '-' + data[key].day;
          }
          that.inforList1 = data;
        } else {
          this.$Message.error(response.data.msg);
        }
      }).catch((error) => {
        console.log(error);
      });

      this.$axiso.get('http://localhost:8081/admin/count/' + this.$route.params.data.id, {
        headers: {
          'token': this.$store.getters.token,
        },
        withCredentials: true,
      }).then((response) => {
        if (response.data.code === 200) {
          let data = response.data.data;
          this.inforList[0].time = data.absenceDays;
          this.inforList[1].time = data.attendanceDays;
          this.inforList[2].time = data.leaveDays;
          this.inforList[3].time = data.leaveEarlyDays;
          this.inforList[4].time = data.travelingDays;
        } else {
          this.$Message.error(response.data.msg);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  };
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
    .div {
        width: 220px;
        height: 44px;
        line-height: 44px;
        background: #1fa7c3;
        color: #fff;
        font-size: 17px;
        text-align: center;
        margin: 20px auto auto;
    }

    .mark1 {
        background-color: #00ee0c;
    }

    .mark2 {
        background-color: red;
    }

    .text-center {
        text-align: center
    }

    h3, h4, h5 {
        margin: 12px
    }

    h3 {
        margin-bottom: 20px
    }

    .state-info .panel .summary h3 {
        font-size: 200%;
        font-weight: 700;
        line-height: 20px;
        margin: 0
    }

    .page-heading h3 {
        color: #49586e;
        font-weight: 400;
        margin: 10px 0
    }

    @media screen and (max-width: 767px) {

    }

    .twt-info h3 {
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        font-weight: 900;
        margin: 10px 0 30px 0;
        text-align: center
    }

</style>