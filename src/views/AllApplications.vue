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
                tableData: [],

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
                        field: 'type',
                        title: '申请类型',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'result',
                        title: '目前状态',
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
                this.loading = true;
                console.log(params);
                let type;
                if (params.type === 'agree') { // do delete operation
                    type = 1;
                } else if (params.type === 'disagree') { // do edit operation
                    type = 2;
                }

                this.$axiso.get('http://localhost:8081/admin/applications/' + params.rowData.id + '/' + params.rowData.type, {
                    headers: {
                        'token': this.$store.getters.token,
                    },
                    withCredentials: true,
                }).then((response) => {

                    let data = response.data;

                    if (data.code === 200) {
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.success('修改失败');
                    }

                    this.loading = false;

                    console.log(data, 'data');

                }).catch((err) => {
                    this.$Message.error(err);
                    this.loading = false;
                });

            }
        },
        created() {
            let that = this;

            this.$axiso.get('http://localhost:8081/admin/applications', {
                headers: {
                    'token': this.$store.getters.token,
                },
                withCredentials: true,
            }).then((response) => {
                let data = response.data.data;

                for (k in data) {
                    switch (data[k].type) {
                        case 1:
                            data[k].type = '请假';
                            break;
                        case 2:
                            data[k].type = '出差';
                            break;
                        case 3:
                            data[k].type = '加班';
                            break;
                    }
                    switch (data[k].result) {
                        case 0:
                            data[k].result = '待审核';
                            break;
                        case 1:
                            data[k].result = '已通过';
                            break;
                        case 2:
                            data[k].result = '未通过';
                            break;
                    }

                    that.tableData = data;

                    console.log(data, 'data');
                }
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    // 自定义列组件
    Vue.component('application-operation', {
        template:
            `<span>
                <a href="" @click.stop.prevent="update(rowData,index)">同意</a>&nbsp;
                <a href="" @click.stop.prevent="deleteRow(rowData,index)">拒绝</a>
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
            update() {
                // 参数根据业务场景随意构造
                let params = {type: 'agree', index: this.index, rowData: this.rowData};
                this.$emit('on-custom-comp', params);
            },

            deleteRow() {
                // 参数根据业务场景随意构造
                let params = {type: 'disagree', index: this.index, rowData: this.rowData};
                this.$emit('on-custom-comp', params);

            }
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