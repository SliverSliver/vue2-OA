<template>
    <div>
        <div style="" class="doc-header">

            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="用户名">
                    <Row>
                        <Input type="text" v-model="formValidate.username" placeholder="请输入用户名" @blur="check()">
                        </Input>
                    </Row>
                </Form-item>
                <Form-item label="密码">
                    <Row>
                        <Input type="text" v-model="formValidate.password" placeholder="请输入密码">
                        </Input>
                    </Row>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit()" v-bind:disabled="disabled1">提交</Button>
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
                disabled1: true,

                formValidate: {
                    username: '',
                    password: '',
                },
            };
        },//data
        methods: {
            handleSubmit() {
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                let params = {
                    'username': this.formValidate.username,
                    'password': this.formValidate.password,
                };
                this.$axiso.post('http://localhost:8081/admin/users', params, {
                    headers: {
                        'token': this.$store.getters.token,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }).then((response) => {
                    if (response.data.code === 200) {
                        this.$Message.success('添加成功!');
                    } else {
                        this.$Message.error(response.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                });
                // } else {
                //     this.$Message.error('表单验证失败!');
                // }
                // });
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            handleAdd() {
                this.formDynamic.items.push({
                    value: '',
                });
            },
            handleRemove(index) {
                this.formDynamic.items.splice(index, 1);
            },


            check() {
                this.$axiso.get('http://localhost:8081//admin/users/' + this.formValidate.username, {
                    headers: {
                        'token': this.$store.getters.token,
                    },
                    withCredentials: true,
                }).then((response) => {
                    if (response.data.code === 200) {
                        if (!response.data.data) {
                            this.$Message.success('用户名未被注册!');
                            this.disabled1 = false;
                        } else {
                            this.$Message.success('用户名已存在!');
                        }
                    } else {
                        this.$Message.error(response.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        created() {
            this.getApplications();

        },
    };
</script>