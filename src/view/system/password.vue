<template>
  <div>
    <Row :gutter="20">
      <i-col span="24">
        <Card :bordered="false" dis-hover>
          <template #title>
            <p>登录密码修改</p>
          </template>
          <Form ref="formPassword" :model="passwordForm" :rules="passwordRules" :label-width="200">
            <FormItem label="当前密码" prop="password">
              <Input type="password" v-model="passwordForm.password" style="width: 300px;" />
            </FormItem>
            <FormItem label="新密码" prop="new_password">
              <Input type="password" v-model="passwordForm.new_password" style="width: 300px;" />
            </FormItem>
            <FormItem label="重复新密码" prop="new_password_confirm">
              <Input type="password" v-model="passwordForm.new_password_confirm" style="width: 300px;" />
            </FormItem>
            <FormItem>
              <Button type="primary" @click="submitPassword" :disabled="loading">修改密码</Button>
            </FormItem>
          </Form>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { changePassword } from '@/api/user'

export default {
  name: 'profile',
  computed: {
    ...mapState(['user']),
  },
  data () {
    return {
      loading: false,
      passwordForm: {
        password: '',
        new_password: '',
        new_password_confirm: ''
      },
      passwordRules: {
        password: [
          { required: true, message: '当前密码必须填写', trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '新密码必须填写', trigger: 'blur' }
        ],
        new_password_confirm: [
          { required: true, message: '重复新密码必须填写', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitPassword () {
      this.$refs['formPassword'].validate(async (valid) => {
        if (!valid) {
          return
        }
        if (this.loading) {
          return
        }
        if (this.passwordForm.password.trim() === '' ||
          this.passwordForm.new_password.trim() === '' ||
          this.passwordForm.new_password_confirm.trim() === '' ||
          this.passwordForm.new_password_confirm.trim() !== this.passwordForm.new_password.trim()) {
          this.$Message.error('填写不正确')
          return
        }
        this.loading = true
        const shadowForm = { ...this.passwordForm }
        try {
          const { data: r } = await changePassword(this.user.token, shadowForm);
          this.loading = false
          this.$Message.success('修改成功')
          this.$refs.formPassword.resetFields()
        } catch(e) {
          this.loading = false
        }
      })
    }
  }
}
</script>
