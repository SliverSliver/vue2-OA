<template>
    <div class="animated fadeIn">


        <Row class="text-center">

            <h3>OA考勤管理系统</h3>

        </Row>

        <Row class="text-center">

            <Button type="success" shape="circle" size="large" long disabled="disabled1">签到</Button>
            <br/>
            <br/>
            <Button type="error" shape="circle" size="large" long disabled="disabled2">签退</Button>

        </Row>

        <Row>
            <Col>
                <h5>近期出勤情况</h5>
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
                disabled1: true,
                disabled2: true,

                columns: [
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
                inforList: [],
            };
        },
        methods: {
            test_logout() {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'});
                }).catch(err => {
                    this.$message.error(err);
                });
            },
        },
        created() {
            let that = this;

            this.$axiso.get('http://localhost:8081/attendances/check', {
                headers: {
                    'token': this.$store.getters.token,
                },
                withCredentials: true,
            }).then((response) => {
                let data = response.data.data;
                if (data === 0) {
                    that.disabled1 = false;
                    that.disabled2 = false;
                } else if (data === 1) {
                    that.disabled2 = false;
                }
                console.log(data);
            }).catch((error) => {
                console.log(error);
            });

            this.$axiso.get('http://localhost:8081/attendances/', {
                headers: {
                    'token': this.$store.getters.token,
                },
                withCredentials: true,
            }).then((response) => {
                let data = response.data.data;
                for (let key in data) {
                    data[key].year = data[key].year + '-' + data[key].month + '-' + data[key].day;
                }
                that.inforList = data;
                console.log(data);
            }).catch((error) => {
                console.log(error);
            });

        },
        mounted() {
            const token = this.$store.getters.token;
        },
    };
</script>

<style type="text/css" scoped>
    .text-center {
        text-align: center
    }

    .staff_progress p {
        margin: 0
    }

    .animated {
        background-color: #eff0f4
    }

    li {
        margin-bottom: 11px;
        margin-left: 10px;
        margin-right: 10px
    }

    .demo-carousel img {
        height: 100%;
        width: 100%
    }

    h3, h4, h5 {
        margin: 12px
    }

    h3 {
        margin-bottom: 20px
    }

    p {
        margin: 12px
    }

    .state-info .panel .summary span {
        color: #49586e;
        font-size: 13px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 10px
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

    .chart-bar img {
        display: inline-block;
        width: 68px;
        height: 45px;
        vertical-align: top
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

    .twt-info p {
        font-size: 18px;
        line-height: 25px;
        font-style: italic;
        margin: 0 0 20px 0;
        text-align: center
    }

    .twt-info p a {
        color: #98fdf4
    }

    .usr-info img {
        vertical-align: middle
    }

    .usr-info h4 {
        color: #658585;
        margin-bottom: 0
    }

    .usr-info .media-body span {
        color: #ea755c;
        font-size: 12px;
        margin-bottom: 20px;
        display: inline-block
    }

    .usr-info .media-body p {
        color: #b6bcbc
    }

    ul.user-states li {
        text-align: center;
        float: left;
        width: 33%;
        font-size: 18px;
        margin: 0
    }
</style>