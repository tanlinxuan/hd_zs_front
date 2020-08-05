<template>
    <div class="Echarts" style="width: 100%;height:500px">
        <div id="main" style="width: 100%;height:100%"></div>
    </div>
</template>
<script type="text/jsx">
    export default {
        name: 'TreeChart',
        methods:{
            myEcharts(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main'));
                // 指定图表的配置项和数据
                let data = {
                    "name": "flare",
                    "children": [
                        {"name": "analytics"},
                        {"name": "animate"},
                        {},
                    ]
                }
                let data1 = {
                    "name": "flare",
                    "children": [
                        {"name": "analytics"},
                        {"name": "animate"},
                    ]
                }
                var option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove',
                        enterable:true,
                    },
                    series:[
                        {
                            type:'tree',
                            top:'10%',
                            orient:'RL',
                            bottom:'10%',
                            left:'20%',
                            right:'50%',
                            symbol:'rect',
                            symbolSize:[200,30],
                            itemStyle:{
                                color:'transparent',
                                borderWidth:0,
                                opacity:1,
                            },
                            tooltip:{
                                formatter:function (params) {
                                    return params.data.fulltitle;
                                },
                            },
                            data:[data],
                            expandAndCollapse:false,
                            label:{
                                position: 'inside',
                                formatter:function(params){
                                    if(params.name.length>11){
                                        return '{b|'+params.name.slice(0,11)+'...}';
                                    }
                                    else {
                                        return '{b|'+params.name+'}';
                                    }
                                },
                                rich:{
                                    b:{
                                        color: '#FFFFFF',
                                        align:'center',
                                        verticalAlign:'middle',
                                        // lineHeight:16,
                                        fontSize:16,
                                        borderWidth:2,
                                        borderColor:'#1B82EA',
                                        width:200,
                                        height:30,
                                        // padding:7,
                                        backgroundColor:'#1B82EA',
                                        borderRadius:6,
                                    },
                                }
                            },
                            lineStyle:{
                                color:'#172D59',
                                curveness:0.7,
                            }
                        },
                        {
                            type:'tree',
                            top:'10%',
                            orient:'LR',
                            bottom:'10%',
                            left:'50%',
                            right:'20%',
                            symbol:'rect',
                            symbolSize:[200,30],
                            itemStyle:{
                                color:'transparent',
                                borderWidth:0,
                                opacity:1,
                            },
                            tooltip:{
                                formatter:function (params) {
                                    return params.data.fulltitle;
                                },
                            },
                            data:[data1],
                            expandAndCollapse:false,
                            label:{
                                position: 'inside',
                                // formatter:['{b|{b}}'].join(''),
                                formatter:function(params){
                                    if(params.name.length>11){
                                        return '{b|'+params.name.slice(0,11)+'...}';
                                    }
                                    else {
                                        return '{b|'+params.name+'}';
                                    }
                                },
                                rich:{
                                    b:{
                                        color: '#FFFFFF',
                                        align:'center',
                                        verticalAlign:'middle',
                                        // lineHeight:16,
                                        fontSize:16,
                                        borderWidth:2,
                                        borderColor:'#1B82EA',
                                        width:200,
                                        height:30,
                                        // padding:7,
                                        backgroundColor:'#1B82EA',
                                        borderRadius:6,
                                    },
                                }
                            },
                            lineStyle:{
                                color:'#172D59',
                                curveness:0.7,
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        mounted() {
            this.myEcharts();
        }
    }
</script>
