<template>
    <div id="login_page">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账户">
                <el-input type="text" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import './index.less'
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    password: '',
                },
            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (!valid) return false
                    that.$store.dispatch('user/userLogin',that.ruleForm).then(()=>{
                        that.$router.push({ path:'/home' })
                    })
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
