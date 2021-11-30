import {Widget} from 'poster/widgetConstructor';
import _merge from 'lodash/merge';

export default class TTSWidget extends Widget {
  constructor(config) {
    config = _merge(
      {
        type: 'screencast',
        typeLabel: '录制源',
        componentName: 'plugin-screencast',
        icon: 'el-icon-video-camera',
        lock: false,
        visible: true,
        isCopied: false,
        wState: {
          text: '字幕由视频创作者提供',
          style: {
            margin: '10px',
            wordBreak: 'break-all',
            color: '#000',
            textAlign: 'center',
            fontSize: '14px', // px
            padding: 0, // px
            borderColor: '#000',
            borderWidth: 0, // px
            borderStyle: 'solid',
            lineHeight: '100%', // %
            letterSpacing: 0, // %
            backgroundColor: '',
            fontWeight: '',
            fontStyle: '',
            textDecoration: '',
          },
        },
      },
      config,
    );
    super(config);
  }
}
