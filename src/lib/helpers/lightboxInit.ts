import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin'

export function initLightbox(getIframeDimensions: () => [string, string]) {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery',
        children: 'a',
        imageClickAction: 'close',
        tapAction: 'close',
        pswpModule: () => import('photoswipe')
    })

    new PhotoSwipeDynamicCaption(lightbox)

    lightbox.addFilter('itemData', (itemData: any) => {
        const youtubeUrl = itemData.element.dataset.youtubeUrl
        if (youtubeUrl) itemData.youtubeUrl = youtubeUrl
        return itemData
    })

    lightbox.on('contentLoad', (event: any) => {
        const { content, isLazy } = event
        if (content.type === 'youtube' && isLazy) {
            event.preventDefault()
            content.element = document.createElement('div')
            content.element.className = 'pswp__youtube-container'

            const iframe = document.createElement('iframe')
            const [width, height] = getIframeDimensions()
            iframe.setAttribute('allowfullscreen', '')
            iframe.setAttribute(
                'allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            )
            iframe.setAttribute('frameborder', '0')
            iframe.setAttribute('width', width)
            iframe.setAttribute('height', height)
            iframe.setAttribute('class', 'absolute-center')
            iframe.src = content.data.youtubeUrl
            content.element.appendChild(iframe)
        }
    })

    lightbox.on('contentResize', ({ content }) => {
        if (content.type === 'youtube' && content.element?.firstChild) {
            const iframe = content.element.firstChild as HTMLIFrameElement
            const [width, height] = getIframeDimensions()
            iframe.setAttribute('width', width)
            iframe.setAttribute('height', height)
        }
    })

    // TODO: navigating between video slides...

    lightbox.on('uiRegister', () => {
        lightbox.pswp!.ui!.registerElement({
            name: 'download-button',
            order: 8,
            isButton: true,
            tagName: 'a',
            html: {
                isCustomSVG: true,
                inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
                outlineID: 'pswp__icn-download'
            },
            onInit: (element: any, pswp: any) => {
                element.setAttribute('download', '')
                element.setAttribute('target', '_blank')
                element.setAttribute('rel', 'noopener')

                pswp.on('change', () => {
                    if (pswp.currSlide.data.type !== 'youtube') {
                        element.href = pswp.currSlide.data.src
                        element.classList.remove('pswp__hidden')
                    } else {
                        element.classList.add('pswp__hidden')
                    }
                })
            }
        })
    })

    lightbox.init()
}
