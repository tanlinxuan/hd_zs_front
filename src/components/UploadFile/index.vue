<script type="text/jsx">
    import axios from 'axios'
    import HTTP from "@httpServer/index";
    import httpServer from "@httpServer/serverConfig";
    import moment from  "moment"
    // const policy={
    //     "host": "https://feifeife.oss-cn-beijing.aliyuncs.com",
    //     "access_id": "LTAI4FiGtAgRFE2DLLoBX8Z4",
    //     "policy": "eyJleHBpcmF0aW9uIjoiMjAyMC0xMC0wOVQwODowMzoxMi42MzhaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwXV19",
    //     "signature": "1e2HCwaVKOvwUmgyR46eXjjihp8=",
    //     "expire": 1602230592,
    //     "callback_url": "http://j-fin.ihdwork.com/fin/v0.1/file/oss/callback"
    // }
    export default {
        name: "UploadFile",
        data() {
            return {
                fileList: [],
                fileUrl:'',
                policy:null
            };
        },
        props:{
            uploadConfig:Object ,  //upload自定义配置
            tips:String  , // 文字提示
            callBack:Function
        },
        methods: {
            getPolicyInfo(){
                return HTTP.get(httpServer.file.policy).then(res=>{
                    return res.data || null
                })
            },
            /***
             * 上传前校验
             * @param file , fileList
             * @returns {Promise<void>}
             */
           async beforeUpload(file , fileList){
               this.policy = await this.getPolicyInfo()
               if(!this.policy) return  false
            },
            randomString() {
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';  // 默认去掉容易混淆的字符oOLl,9gq,Vv,Uu,I1
                var maxPos = $chars.length;
                var str = '';
                for (let i = 0; i < 10; i++) {
                    str += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return str;
            },
            /***
             * 自定义上传方法
             * @param options
             * @returns {Promise<void>}
             */
            async customRequest(options) {
                const { onSuccess, onError, file, onProgress } = options;
                const {policy}=this

                let formData = new FormData(),
                    date = moment(new Date().getTime()).format('YYYY-MM-DD'),
                    chars = this.randomString(),
                    ossFileName=`fin/change/${date}/${chars}`;
                this.fileUrl = policy.host+`/`+ossFileName;
                formData.append("key", ossFileName);
                formData.append("OSSAccessKeyId", policy.access_id);
                formData.append("policy", policy.policy);
                formData.append("Signature", policy.signature);
                formData.append("file", file);
                let config = {
                    url: policy.host,
                    method: 'post',
                    data: formData,
                    onUploadProgress: ({ total, loaded })=> {
                        onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file)
                    }
                }
                axios(config).then(res => {
                    file.url = res.url;
                    onSuccess(res,file)
                }).catch( err =>{
                    onError()
                })
            },
            handleChange(info) {
                const {name ,status ,uid} = info.file;
                let file = {name , status , uid, url:this.fileUrl}
                this.fileList = [{...file}];
                if(status === 'done'){
                    this.callBack(file)
                }
            },
        },
        render() {
            let {props,on}=this.uploadConfig || {}
            let config={
                props:{
                    customRequest:this.customRequest,
                    beforeUpload:this.beforeUpload,
                    multiple:true,
                    fileList:this.fileList,
                    ...props
                },
                on:{
                    change:this.handleChange,
                    ...on
                }
            }
            return(
                <a-upload {...config}>
                    <a-button><a-icon type="upload"/>上传文件</a-button>
                    <span class="upload-tip">{this.tips || '文件大小不能超过10M'}</span>
                </a-upload>
            )

        }
    }
</script>
<style scoped type="text/css">
    .upload-tip{
        margin-left: 20px;
        line-height: 32px;
        color: #bfbfbf;
    }

</style>