<template>
    <div>
        <div style="" class="doc-header">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="申请类别" prop="type">
                    <Radio-group v-model="formValidate.type">
                        <Radio label="1">出差</Radio>
                        <Radio label="2">请假</Radio>
                        <Radio label="3">加班</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="选择日期">
                    <Row>
                        <Form-item prop="start">
                            <Date-picker type="date" placeholder="选择出发日期" v-model="formValidate.start"></Date-picker>
                        </Form-item>
                    </Row>
                </Form-item>
                <Form-item label="">
                    <Row>
                        <Form-item prop="end">
                            <Date-picker type="date" placeholder="选择结束日期" v-model="formValidate.end"></Date-picker>
                        </Form-item>
                    </Row>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formValidate: {
                    type: '',
                    start: '',
                    end: ''
                },
                ruleValidate: {
                    type: [
                        {required: true, message: '请选择类别', trigger: 'change'}
                    ],
                    start: [
                        {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
                    ],
                    end: [
                        {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
                    ],
                },
            }
        },//data
        methods: {
            handleSubmit(name) {
                let that = this;

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams();
                        params.append('type', that.formValidate.type);
                        params.append('beginDate', that.formValidate.start);
                        params.append('endDate', that.formValidate.end);
                        this.$axiso.post('/application', params
                        ).then((response) => {
                            if (response.code === 200) {
                                this.$Message.success('提交成功!');
                            } else {
                                this.$Message.error('未知错误!');
                                console.log(response.msg)
                            }
                        }).catch((error) => {
                            console.log(error)
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            handleAdd() {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove(index) {
                this.formDynamic.items.splice(index, 1);
            },

            submit() {
                this.$axiso.get('/api/getCount').then((response) => {
                    let data = response.data;

                    this.inforList = data.inforList;
                }).catch((error) => {
                    console.log(error)
                });
            }
        },
    }
</script>