<template>
    <div class="content">
        <Row>
        <!-- agoDayHide='1517483961' -->
        <!-- futureDayHide="1526054400" -->
        <!-- isHideOtherday=false -->
        <Calendar ref="Calendar" :markDateMore="arr"></Calendar>
        </Row>
    </div>
</template>

<script>
    import Calendar from 'vue-calendar-component';

    export default {
        data() {
            return {
            }
        },
        components: {
            Calendar
        },
        methods: {
            demo() {
                // this.$refs.Calendar.ChoseMonth('2017-12-12',false); //跳到12月12日 但是不选中12月12日
                this.$refs.Calendar.ChoseMonth('2017-12-12'); //跳到12月12日
            }
        },
        created() {
            function format(date, index) {
                date = new Date(date);
                return `${date.getFullYear()}/${date.getMonth() + 1}/${index}`;
            }

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
</style>