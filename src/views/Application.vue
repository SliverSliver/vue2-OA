<template>
    <div>
        <div style="" class="doc-header">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="申请类别" prop="type">
                    <Radio-group v-model="formValidate.type">
                        <Radio label="1">请假</Radio>
                        <Radio label="2">出差</Radio>
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


            <Row>
                <Col>
                    <h5>近期申请情况</h5>
                </Col>
                <Col>
                    <Table :columns="columns" :data="inforList"></Table>
                </Col>
            </Row>

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
          end: '',
        },
        ruleValidate: {
          type: [
            {required: true, message: '请选择类别', trigger: 'change'},
          ],
          start: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'},
          ],
          end: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'},
          ],
        },

        columns: [
          {
            title: '开始时间',
            key: 'beginDate',
          },
          {
            title: '结束时间',
            key: 'endDate',
          },
          {
            title: '类型',
            key: 'type',
          },
          {
            title: '申请结果',
            key: 'result',
          },
        ],
        inforList: [],
      };
    },//data
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let start = this.formValidate.start;
            let end = this.formValidate.end;
            let startDate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
            let endDate = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
            console.log(startDate);
            console.log(endDate);
            let params = {
              'type': this.formValidate.type,
              'beginDate': startDate,
              'endDate': endDate,
            };
            this.$axiso.post('http://localhost:8081/applications', params, {
              headers: {
                'token': this.$store.getters.token,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }).then((response) => {
              if (response.data.code === 200) {
                this.$Message.success('提交成功!');
                this.getApplications();
              } else {
                this.$Message.error(response.data.msg);
              }
            }).catch((error) => {
              console.log(error);
            });
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
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

      getApplications() {
        this.$axiso.get('http://localhost:8081/applications', {
          headers: {
            'token': this.$store.getters.token,
          },
          withCredentials: true,
        }).then((response) => {
          if (response.data.code === 200) {
            let data = response.data.data;

            for (let k in data) {
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

              this.inforList = data;

              console.log(data, 'data');
            }
          } else {
            this.$Message.error(response.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
      },
    },
    created() {
      this.getApplications();

    },
  };
</script>