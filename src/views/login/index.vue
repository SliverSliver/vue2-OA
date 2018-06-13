<template>
    <div class="login-container" style="background-color: #141a48;margin: 0;overflow: hidden;" v-if="isReload">
        <div id="canvascontainer" ref='can'></div>

        <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules" class="card-box login-form">
            <Form-item prop="email">
                <Input type="text" v-model="loginForm.email" placeholder="Username" autoComplete="on">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="Password"
                       @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleLogin('loginForm')" long>{{type}}</Button>
            </Form-item>
            <div class="center">
                <div class='tips'>{{tips}}
                    <a @click="change">{{tip}}</a>
                </div>
            </div>
        </Form>

    </div>
</template>

<script>
    import {isWscnEmail} from 'utils/validate';

    let particles;
    let particle;
    let camera;
    let scene;
    let renderer;
    let container;
    let SEPARATION = 100;
    let AMOUNTX = 50;
    let AMOUNTY = 50;
    export default {
        name: 'login',
        data() {
            const validateEmail = (rule, value, callback) => {
                if (!isWscnEmail(value)) {
                    callback(new Error('请输入正确的合法邮箱'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                isReload: false,


                type: '',
                type1: '登陆',
                type2: '注册',
                tips: '',
                tips1: '没有账号？',
                tips2: '已有账号？',
                tip: '',
                tip1: '点击注册',
                tip2: '点击登陆',

                loginForm: {
                    email: '',
                    password: '',
                },
                loginRules: {
                    email: [
                        {required: true, trigger: 'blur', validator: validateEmail},
                    ],
                    password: [
                        {required: true, trigger: 'blur', validator: validatePass},
                    ],
                },
                loading: false,
                showDialog: false,
            };
        },
        mounted() {
            container = document.createElement('div');
            this.$refs.can.appendChild(container);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            particles = [];

            let PI2 = Math.PI * 2;
            let material = new THREE.ParticleCanvasMaterial({

                color: 0x0078de,
                program: function (context) {

                    context.beginPath();
                    context.arc(0, 0, 1, 0, PI2, true);
                    context.fill();

                },

            });

            let i = 0;

            for (let ix = 0; ix < AMOUNTX; ix++) {

                for (let iy = 0; iy < AMOUNTY; iy++) {

                    particle = particles[i++] = new THREE.Particle(material);
                    particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                    particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                    scene.add(particle);

                }

            }

            renderer = new THREE.CanvasRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            document.addEventListener('mousemove', onDocumentMouseMove, false);

            window.addEventListener('resize', onWindowResize, false);

            animate();
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
                            this.$Message.success('登录成功');

                            this.loading = false;
                            this.$router.push({path: '/'});
                        }).catch(err => {
                            this.$Message.error(err);
                            this.loading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            change() {
                if (this.type === this.type1) {
                    this.type = this.type2;
                    this.tips = this.tips2;
                    this.tip = this.tip2;
                } else {
                    this.type = this.type1;
                    this.tips = this.tips1;
                    this.tip = this.tip1;
                }
            },
        },
        created() {
            this.type = this.type1;
            this.tips = this.tips1;
            this.tip = this.tip1;

            // if (this.$route.params.isReload != null && this.$route.params.isReload) {
            //     this.isReload = true
            // } else {
            //     this.$router.push({
            //         path: '/',
            //         params: {
            //             isReload: true,
            //         }
            //     });
            // }
        },
    };

    let count = 0;

    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function onDocumentMouseMove(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

    }

    function animate() {
        requestAnimationFrame(animate);

        render();
    }

    function render() {

        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);

        let i = 0;

        for (let ix = 0; ix < AMOUNTX; ix++) {

            for (let iy = 0; iy < AMOUNTY; iy++) {

                particle = particles[i++];
                particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 +
                    (Math.sin((iy + count) * 0.5) + 1) * 2;

            }

        }

        renderer.render(scene, camera);

        count += 0.1;

    }
</script>
<style>
    .login-container a {
        color: #0078de;
    }

    #canvascontainer {
        position: absolute;
        top: 0;
    }

</style>

<style rel="stylesheet/scss" lang="scss">
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
    }

    .login-container {
        height: 100vh;
        background-color: #2d3a4b;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 1px solid #2d8cf0;
            -webkit-appearance: none;
            border-radius: 3px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 26px;
            color: #eeeeee;
            margin: 0 auto 40px auto;
            text-align: center;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }

</style>
