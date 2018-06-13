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
                <h5>{{username}}近期考勤统计</h5>
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
                        key: 'type'
                    },
                    {
                        title: '次数',
                        key: 'time'
                    }
                ],
                inforList: [],


                columns1: [
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '签到时间',
                        key: 'start'
                    },
                    {
                        title: '签退时间',
                        key: 'end'
                    }
                ],
                inforList1: []
            }
        },
        components: {},
        methods: {
        },
        created() {
            let that = this;

            // 将数据放在当前组件的数据内
            this.username = this.$route.params.data.username;
            // console.log(this.$route.params.data.username, 'data');

            this.$axiso.get('/api/getCount').then((response) => {
                let data = response.data;

                that.inforList = data.inforList;

                console.log(data.inforList);
            }).catch((error) => {
                console.log(error)
            });

            this.$axiso.get('/api/getDate').then((response) => {
                let data = response.data;

                that.inforList1 = data.inforList;

                console.log(data.inforList);
            }).catch((error) => {
                console.log(error)
            });
        }
    }
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