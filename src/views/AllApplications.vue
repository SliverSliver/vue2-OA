<template>
    <div class="content">

        <Row>
            <Col>
                <h5>申请记录</h5>
            </Col>
            <Col>
                <v-table
                        is-horizontal-resize
                        style="width:100%"
                        :columns="columnss"
                        :table-data="tableData"
                        row-hover-color="#eee"
                        row-click-color="#edf7ff"
                        @on-custom-comp="customCompFunc"
                ></v-table>
            </Col>
        </Row>

    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                tableData: [
                    {"username":"赵伟","beginDate":"156*****1987","endDate":"钢琴、书法、唱歌"},
                    {"username":"李伟","beginDate":"182*****1538","endDate":"钢琴、书法、唱歌"},
                    {"username":"孙伟","beginDate":"161*****0097","endDate":"钢琴、书法、唱歌"},
                    {"username":"周伟","beginDate":"197*****1123","endDate":"钢琴、书法、唱歌"},
                ],

                columnss: [
                    {
                        field: 'username',
                        title: '姓名',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'beginDate',
                        title: '开始日期',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'endDate',
                        title: '结束日期',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'custome-adv',
                        title: '操作',
                        width: 200,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        componentName: 'application-operation',
                        isResize: true
                    }
                ]
            }
        },
        components: {},
        methods: {
            customCompFunc(params) {
                console.log(params);
                if (params.type === 'delete'){ // do delete operation

                    this.$delete(this.tableData,params.index);

                }else if (params.type === 'edit'){ // do edit operation

                    alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
                }
                // if (params.type === 'delete') { // do delete operation

                // } else if (params.type === 'edit') { // do edit operation

                // }
            }
        },
        created() {
            let that = this;

            this.$axiso.get('/admin/applications').then((response) => {

                let data = response.data.data;

                console.log(data.length, 'data');

                for (let k in data) {
                    console.log(k, 'k');
                    // that.tableData.push(data[k].user.username, data[k].application.beginDate, data[k].application.endDate);
                    // that.tableData[k].username = data[k].user.username;

                    console.log(data[k].user.username, 'username', k);
                }
                // that.tableData = data.data;


            }).catch((error) => {
                console.log(error)
            });

        }
    }

    // 自定义列组件
    Vue.component('application-operation', {
        template:
            `<span>        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
            <!--<a href="" @click.stop.prevent="agree(rowData,index)">同意</a>&nbsp;-->
            <!--<a href="" @click.stop.prevent="disagree(rowData,index)">拒绝</a>-->
            </span>`,
        props: {
            rowData: {
                type: Object
            },
            field: {
                type: String
            },
            index: {
                type: Number
            }
        },
        methods: {
            update(){

                // 参数根据业务场景随意构造
                let params = {type:'edit',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            },

            deleteRow(){

                // 参数根据业务场景随意构造
                let params = {type:'delete',index:this.index};
                this.$emit('on-custom-comp',params);

            }
            // agree() {
            //     let params = {type: 'agree', rowData: this.rowData};
            //     this.$emit('on-custom-comp', params);
            // },
            // disagree() {
            //     let params = {type: 'disagree', rowData: this.rowData};
            //     this.$emit('on-custom-comp', params);
            // },
        }
    })
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