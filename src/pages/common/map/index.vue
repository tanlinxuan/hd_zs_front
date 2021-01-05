
<script type="text/jsx">
    import './index.less'
    export default {
        name: 'map',
        data(){
          return {
              map:null ,
              coordinates:[
                  {
                      name:'长治 -> 北京首都机场',
                      click:false,
                      coord:[  //长治 -> 北京大兴机场
                          [113.131091,36.247543],
                          [114.045565,38.489861,116.599566,40.084934],
                      ]
                  },
                  {
                      name:'长治 -> 北京大兴机场',
                      click:false,
                      coord:[ //长治 -> 北京首都机场
                          [113.131091,36.247543],
                          [114.045565,38.489861,116.428889,39.510877],
                      ],
                  },
                  {
                      name:'长治 -> 上海浦东机场',
                      click:true,
                      coord:[ //长治 -> 上海浦东机场
                          [113.131091,36.247543],
                          [119.392198,35.466562,121.808503,31.142326],
                      ]
                  },
                  {
                      name:'长治 -> 天津',
                      click:true,
                      coord:[ //长治 -> 天津
                          [113.131091,36.247543],
                          [114.410925,38.389244,117.362544,39.127479],
                      ]
                  },
                  {
                      name:'长治 -> 昆明',
                      click:true,
                      coord:[ //长治 -> 昆明
                          [113.131091,36.247543],
                          [104.643668,33.514867,102.932731,25.102108],
                      ]
                  },
                  {
                      name:'长治 -> 桂林',
                      click:true,
                      coord:[ //长治 -> 桂林
                          [113.131091,36.247543],
                          [109.206225,31.690526,110.046752,25.217988],
                      ]
                  },
                  {
                      name:'长治 -> 沈阳',
                      click:true,
                      coord:[ //长治 -> 沈阳
                          [113.131091,36.247543],
                          [118.170182,41.407981,123.493805,41.639663]
                      ]
                  },
                  {
                      name:'长治 -> 重庆',
                      click:true,
                      coord:[ //长治 -> 重庆
                          [113.131091,36.247543],
                          [107.782519,34.552387,106.653949,29.718563]
                      ]
                  },
                  {
                      name:'长治 -> 太原',
                      click:true,
                      coord:[ //长治 -> 太原
                          [113.131091,36.247543],
                          [112.40455,37.045305,112.631143,37.753336]
                      ]
                  },
                  {
                      name:'长治 -> 广州',
                      click:true,
                      coord:[ //长治 -> 太原
                          [113.131091,36.247543],
                          [110.492827,30.213183,113.307237,23.390574]
                      ]
                  },
                  {
                      name:'长治 -> 武汉',
                      click:true,
                      coord:[ //长治 -> 武汉
                          [113.131091,36.247543],
                          [115.543543,33.841095,114.220761,30.773715]
                      ]
                  },
                  {
                      name:'长治 -> 海口',
                      click:true,
                      coord:[ //长治 -> 海口
                          [113.131091,36.247543],
                          [108.595597,29.010852,110.466966,19.94258]
                      ]
                  },
                  {
                      name:'长治 -> 深圳',
                      click:true,
                      coord:[ //长治 -> 深圳
                          [113.131091,36.247543],
                          [110.492827,30.213183,113.813694,22.635342]
                      ]
                  },
                  {
                      name:'长治 -> 南京',
                      click:true,
                      coord:[ //长治 -> 南京
                          [113.131091,36.247543],
                          [117.893114,34.950985,118.869905,31.732304]
                      ]
                  },
                  {
                      name:'长治 -> 长沙',
                      click:true,
                      coord:[ //长治 -> 长沙
                          [113.131091,36.247543],
                          [114.989946,32.416056,113.225267,28.188096]
                      ]
                  },
                  {
                      name:'长治 -> 南昌',
                      click:true,
                      coord:[ //长治 -> 南昌
                          [113.131091,36.247543],
                          [117.135488,33.643995,115.911885,28.858735]
                      ]
                  }
              ],
              activeCoordinates:{},
              lnglat:[] ,  //已选中的坐标集合
              subLnglat:{},  // 重渲染数据集
              showAll:true
          }
        },

        methods: {
            //初始化图层
            setMap(){
                this.map =new AMap.Map('container', {
                    center: [ 113.131091,36.247543 ],
                    zoom: 6
                });
                this.setLine();
            },

            // 基本航线
            setLine(){
                let that = this ;
                if(this.showAll){
                    AMap.plugin('AMap.BezierCurve', () => {
                        that.map.add(that.coordinates.map(item=>{
                           return  new AMap.BezierCurve({
                                path: item.coord,
                                strokeColor: "#3366FF",
                                strokeWeight: 1,
                            })
                        }))
                    })
                }else{
                    let { coord } = this.activeCoordinates ;

                    coord && AMap.plugin('AMap.BezierCurve', () => {
                        var bezier = new AMap.BezierCurve({
                            path: [...coord],
                            strokeColor: "#3366FF",
                            strokeWeight: 4,
                        })

                        that.map.add([bezier]);

                        bezier.on('click' , (event)=>{
                            let lnglat = event.lnglat
                            let stroke = [lnglat.getLng(),lnglat.getLat()]
                            that.lnglat.push(stroke)
                            that.setSubLine();
                        })
                    })
                }
            },


            // 渲染当前选中的坐标
            setSubLine(){
                let that = this
                let {path ,name} = that.subLnglat;
                that.subLnglat ={
                    name,
                    path:[path[0] , ...that.lnglat]
                }
                let defaultRenderOptions = {
                    renderAllPointsIfNumberBelow: -1,
                    pathTolerance: 2,
                    keyPointTolerance: 0,
                    pathLineStyle: {
                        lineWidth: 2,
                        strokeStyle: '#F7B538',
                        borderWidth: 1,
                        borderStyle: 'rgba(204, 63, 88,0)',
                        dirArrowStyle: false
                    },
                    startPointStyle: {
                        radius: 6,
                        fillStyle: '#109618',
                        lineWidth: 1,
                        strokeStyle: '#eeeeee'
                    },
                    endPointStyle: {
                        radius: 6,
                        fillStyle: '#dc3912',
                        lineWidth: 1,
                        strokeStyle: '#eeeeee'
                    },
                };

                AMapUI.load(['ui/misc/PathSimplifier', 'lib/$', 'lib/utils'], (PathSimplifier, $, utils) =>{
                     let pathSimplifierIns = new PathSimplifier({
                        zIndex:101,
                        map:that.map,
                        getPath: (pathData)=>{
                            return pathData.path;
                        },
                        renderOptions: defaultRenderOptions
                    });
                    pathSimplifierIns.setData([that.subLnglat]);
                });

            },

            //点击按钮切换当前要收集坐标的线路
            changeActiveLine(record){
                let {name , coord } = record;
                this.activeCoordinates = {...record}  //记录当前路线项目
                this.subLnglat={  // 记录当前重渲染数据
                    name,
                    path:[ coord[0] ]
                }
                this.lnglat= []
                this.showAll = false
                this.setMap();
            },

            renderBtn(){
               let { name } = this.activeCoordinates;
               return this.coordinates.map( (item,index) =>{
                    return <a-button class={{'active':item.name === name}} key={ index } onClick={()=>{ this.changeActiveLine(item) }}>
                                {item.name}
                            </a-button>
                })
            },

            renderLnglat(){
                if(!this.lnglat.length) return  false
                return this.lnglat.map((item, index)=>{
                    return <p key = {index}>{`[${item[0]},${item[1]}],`}</p>
                })
            },
        },

        mounted() {
            this.setMap();
        },

        render() {
            let { name } = this.activeCoordinates;
            return (<div class="map">
                        <div id="container"></div>
                        <div class="float-box left" style={{textAlign:'center'}}>
                            {this.renderBtn()}
                        </div>
                        <div class="float-box right">
                            <div class="title">
                                { name }
                            </div>
                            <div class="content">
                                {
                                    this.renderLnglat()
                                }
                            </div>
                        </div>
                    </div>
            )
        }
    }
</script>
