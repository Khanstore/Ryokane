odoo.define('hlcloud_website.wysiwyg.widgets.media', function (require) {
    'use strict';

    var MediaModules = require('wysiwyg.widgets.media');
    var core = require('web.core');
    var _t = core._t;
    var media = require('wysiwyg.widgets.media');

    media.MediaWidget.include({
        start: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                self.$('.o_video_dialog_options').after('<div class="upload-area">\n' +
                    '                    <label class="col-form-label" for="o_video_text">\n' +
                    '                        其他上传方式\n' +
                    '                    </label>\n' +
                    '                    <div id="videoDragDrop">\n' +
                    '                        <button type="button" class="btn btn-primary upload-trigger">点击上传视频</button>\n' +
                    '                    </div>\n' +
                    '                </div>');
            });
        }
    });

    MediaModules.VideoWidget.include({

        events: _.extend({}, MediaModules.VideoWidget.prototype.events || {}, {
            'click .upload-trigger': '_openVideoUploadModal',
        }),

        _openVideoUploadModal: function () {
            this.uppy.getPlugin('Dashboard').openModal();
        },

        start: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                //    处理视频文件上传
                var uppy = Uppy.Core({
                    debug: true,
                    meta: {
                        csrf_token: core.csrf_token
                    },
                    autoProceed: true,
                    locale: Uppy.locales.zh_CN,
                    allowMultipleUploads: false,
                    restrictions: {
                        maxNumberOfFiles: 1,
                        allowedFileTypes: ['video/*', '.mp4']
                    },
                });
                uppy.use(Uppy.Dashboard, {
                    // trigger: '.upload-trigger',
                    closeAfterFinish: true,
                    inline: false,
                    proudlyDisplayPoweredByUppy: false,
                    showProgressDetails: true
                });
                uppy.use(Uppy.Webcam, {
                    target: Uppy.Dashboard,
                    title: '摄像头(https)'
                });
                uppy.use(Uppy.ScreenCapture, {target: Uppy.Dashboard, title: '屏幕录制'});
                uppy.use(Uppy.XHRUpload, {
                    endpoint: location.origin + '/videos/upload/process',
                    fieldName: 'file'
                });
                uppy.on('upload-success', (file, response) => {
                    // HTTP status code
                    // extracted response data
                    console.log('文件上传成功', file, response.status, response.body);
                    const videoUrl = response.body.url;
                    self._updateVideoViaUrl(videoUrl);
                });
                self.uppy = uppy;
            });
        },
        _updateVideoViaUrl: function (url) {
            var query = this._createVideoNode(url, {
                'autoplay': this.isForBgVideo || this.$('input#o_video_autoplay').is(':checked'),
                'hide_controls': this.isForBgVideo || this.$('input#o_video_hide_controls').is(':checked'),
                'loop': this.isForBgVideo || this.$('input#o_video_loop').is(':checked'),
                'hide_fullscreen': this.isForBgVideo || this.$('input#o_video_hide_fullscreen').is(':checked'),
                'hide_yt_logo': this.isForBgVideo || this.$('input#o_video_hide_yt_logo').is(':checked'),
                'hide_dm_logo': this.isForBgVideo || this.$('input#o_video_hide_dm_logo').is(':checked'),
                'hide_dm_share': this.isForBgVideo || this.$('input#o_video_hide_dm_share').is(':checked'),
            });

            var $optBox = this.$('.o_video_dialog_options');

            // Show / Hide preview elements
            this.$el.find('.o_video_dialog_preview_text, .media_iframe_video_size').add($optBox).toggleClass('d-none', !query.$video);
            // Toggle validation classes
            this.$el.find('#o_video_form_group')
                .toggleClass('o_has_error', !query.$video).find('.form-control, .custom-select').toggleClass('is-invalid', !query.$video)
                .end()
                .toggleClass('o_has_success', !!query.$video).find('.form-control, .custom-select').toggleClass('is-valid', !!query.$video);

            // Individually show / hide options base on the video provider
            $optBox.find('div.o_' + query.type + '_option').removeClass('d-none');

            // Hide the entire options box if no options are available or if the
            // dialog is opened for a background-video
            $optBox.toggleClass('d-none', this.isForBgVideo || $optBox.find('div:not(.d-none)').length === 0);

            if (query.type === 'youtube') {
                // Youtube only: If 'hide controls' is checked, hide 'fullscreen'
                // and 'youtube logo' options too
                this.$('input#o_video_hide_fullscreen, input#o_video_hide_yt_logo').closest('div').toggleClass('d-none', this.$('input#o_video_hide_controls').is(':checked'));
            }

            var $content = query.$video;
            if (!$content) {
                switch (query.errorCode) {
                    case 0:
                        $content = $('<div/>', {
                            class: 'alert alert-danger o_video_dialog_iframe mb-2 mt-2',
                            text: _t("The provided url is not valid"),
                        });
                        break;
                    case 1:
                        $content = $('<div/>', {
                            class: 'alert alert-warning o_video_dialog_iframe mb-2 mt-2',
                            text: _t("The provided url does not reference any supported video"),
                        });
                        break;
                }
            }
            this.$content.replaceWith($content);
            this.$content = $content;
            this.$('textarea#o_video_text').val(url);
        },
        save: function () {
            var self = this;

            return this._super(...arguments).then(function (data) {
                const videoSrc = self.$content.attr('src');
                if (videoSrc.endsWith('mp4')) {
                    $(data).find('.media_iframe_video_size').addClass('custom_video_size');
                } else {
                    $(data).find('.media_iframe_video_size').removeClass('custom_video_size');
                }
                return $(data)[0];
            });
        },

        _getVideoURLData: function (url, options) {
            const matchRes = url.match(/^(http:\/\/|https:\/\/|\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z0-9]{1,5}(:[0-9]{1,5})?(\/.*)?$/i);
            if (matchRes && matchRes[4].endsWith('mp4')) {
                return {type: 'other', embedURL: url};
            }
            return this._super(...arguments);
        }
    });

});