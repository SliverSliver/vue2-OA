<template>
    <div class="content">

        <Row>
            <!-- agoDayHide='1517483961' -->
            <!-- futureDayHide="1526054400" -->
            <!-- isHideOtherday=false -->
            <Calendar ref="Calendar" :markDateMore="arr"></Calendar>
        </Row>

        <Row>
            <Col>
                <h5>近期考勤统计</h5>
            </Col>
            <Col>
                <Table :columns="columns" :data="inforList"></Table>
            </Col>
        </Row>

    </div>
</template>

<script>
    import Calendar from 'vue-calendar-component';

    export default {
        data() {
            return {
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
            }
        },
        components: {
            Calendar
        },
        methods: {
        },
        created() {
            let that = this;

            function format(date, index) {
                date = new Date(date);
                return `${date.getFullYear()}/${date.getMonth() + 1}/${index}`;
            }

            this.$axiso.get('/api/getCount').then((response) => {
                let data = response.data;

                that.inforList = data.inforList;

                console.log(data.inforList);
            }).catch((error) => {
                console.log(error)
            });

            this.arr = [{
                date: format(new Date(), 1),
                className: "mark1"
            }, {
                date: format(new Date(), 4),
                className: "mark1"
            }, {
                date: format(new Date(), 5),
                className: "mark1"
            }, {
                date: format(new Date(), 6),
                className: "mark1"
            }, {
                date: format(new Date(), 7),
                className: "mark2"
            }]
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