<template>
    <div class="comment-item">
        <div class="comment-avater">
            <img :src="`http://gravatar.duoshuo.com/avatar/${data.from.admin.emailmd5}?s=50`" v-if="data.from.admin">
            <img :src="`http://gravatar.duoshuo.com/avatar/${data.from.user.email}?s=50`" v-else>
        </div>
        <div class="comment-box">
            <div class="content">
                <p class="comment-info">
                    <span v-if="data.from.admin" class="comment-name">{{data.from.admin.name}}</span>
                    <span v-else class="comment-name">{{data.from.user.name}}</span>
                    <span class="comment-xz">  </span>
                    <span class="comment-os comment-tag">{{ data.os }} </span>
                </p>
                <div class="comment-content">
                    {{data.content}}
                </div>
                <div class="comment-footer">
                    <span class="comment-time comment-tag">{{ data.create_time[1] }} </span>
                    <span class="comment-xz">  </span>
                    <span class="comment-time comment-tag comment-btn"
                        v-if="!cm"
                        @click="$emit('commentBtn',data._id)"
                    >评论</span>
                    <span class="comment-tag more" 
                        v-if="data.child && !more"
                        @click="$emit('commentMore',data._id)"
                    >展开评论</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data:Object,
        more:{
            type:Boolean,
            default:false
        },
        cm:{
            type:Boolean,
            default:false
        }
    }
}
</script>
<style lang="less">

.comment-item {
    display: flex;
    padding-bottom: 22px;
    .comment-avater {
        box-shadow: 0 0 26px -10px #ccc;
        width: 50px;
        min-width: 50px;
        height: 50px;
        min-height: 50px;
        border-radius: 100%;
        background: #ccc;
        overflow: hidden;
    }
    .comment-box {
        box-sizing: border-box;
        padding-left: 12px;
        width: 100%;
        min-height: 80px;
        .comment-tag {
            font-size: 14px;
            color: #aaa;
        }
        .comment-xz {
            color: #aaa;
            margin: 0 6px;
        }
        .content {
            box-sizing: border-box;
            padding: 0 12px 12px 12px;
            border-radius: 8px;
            height: 100%;
            background: #fff;
            .comment-info {
                margin-bottom: 8px;
                .comment-name {
                    font-weight: 700;
                    font-size: 16px;
                    color: #404040; 
                    padding-bottom: 6px;
                }
            }
            .comment-content {
                padding-bottom: 6px;
                color: #666;
            }
            .comment-footer {
                position: relative;
                .more {
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                }
            }
        }
        .comment-btn {
            cursor: pointer;
        }
        /*
        .comment-form {
            margin: 0;
            .comment-form-admin {
                margin: 6px 0;
                min-height: 32px;
                .comment-input {
                    padding-left: 38px;
                    .text {
                        font-size: 16px;
                        min-height: 24px;
                        line-height: 24px;
                    }
                }
            }
            .comment-form-avater {
                width: 32px;
                height: 32px;
            }
        }*/
    }
}
</style>