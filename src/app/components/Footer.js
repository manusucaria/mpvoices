'use client'
import React from 'react'

import Link from 'next/link'

const email = 'info@mpvoices.com.ar'
const tel = '+54 9 1133825678'
const dir = 'Blanco Encalada 2405, Béccar.'

export default function Footer () {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div id="Footer" className="flex flex-col mt-auto ">
      <div className="mx-auto my-6 flex" onClick={scrollToTop}>
        <svg
          className="cursor-pointer m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="202"
          height="106"
          viewBox="0 0 202 106"
          fill="none"
        >
          <path
            d="M35.7021 75.0458C31.6712 75.0458 27.5444 73.0339 27.0165 68.2587C26.2967 61.7382 31.7192 54.8299 35.6781 49.7638L36.5179 48.6973L36.5659 48.7215L36.7338 48.5034L37.0937 48.7942L36.9258 48.9882C36.6618 49.3275 36.3739 49.6911 36.086 50.0547C32.1751 55.0481 26.8246 61.8594 27.5204 68.1617C28.0722 73.1308 32.8229 74.8761 36.9977 74.3913L37.0457 74.9003C36.6138 74.9973 36.158 75.0215 35.7021 75.0458ZM39.8769 69.4464C38.6053 69.4464 37.4056 68.9131 36.5659 67.9678C35.6061 66.9013 35.0063 65.5438 34.8623 64.1137L35.3662 64.0652C35.5101 65.3984 36.062 66.6346 36.9497 67.6042C37.8135 68.5738 39.0852 69.0586 40.3808 68.9131C42.0363 68.7192 43.6199 67.7254 44.9155 66.0286C47.5788 62.5624 48.9224 56.4782 48.1786 51.2182C47.9627 49.6669 47.6028 48.1155 47.2909 46.7581C47.027 45.7643 46.835 44.7462 46.6911 43.7281C46.4751 41.7647 47.3389 39.5347 49.7622 39.2681C50.8179 39.0984 51.8976 39.3893 52.7614 40.068C54.249 41.2799 54.6808 43.3888 54.8008 44.5523L54.2969 44.6008C54.177 43.5342 53.7931 41.5466 52.4495 40.4558C51.7057 39.874 50.7699 39.6316 49.8342 39.7771C47.7708 40.0195 47.051 41.9587 47.2189 43.6554C47.3629 44.6493 47.5548 45.6431 47.8187 46.6127C48.1546 47.9943 48.5145 49.5457 48.7305 51.1212C49.4983 56.5994 48.1546 62.7078 45.3714 66.3195C43.9798 68.1375 42.2763 69.204 40.4768 69.4222C40.2368 69.4464 40.0689 69.4464 39.8769 69.4464ZM25.5049 52.4302C25.289 52.4302 25.073 52.3332 24.9051 52.212C24.2573 51.6788 23.8974 50.2729 23.8494 49.7153C23.6334 47.7277 24.1613 45.7158 25.241 44.3341C26.0808 43.2434 27.3284 42.5646 28.672 42.4192C30.7595 42.1768 32.1751 43.0979 33.3987 43.8978C34.4304 44.5765 35.3182 45.134 36.4459 45.0128C37.7655 44.8674 38.0774 44.019 38.3654 42.9282L38.3894 42.8313C38.7013 41.7647 39.0372 40.6497 40.5008 40.48C41.5325 40.3588 42.3243 41.0618 42.4442 42.1768L41.9404 42.2495C41.8684 41.6193 41.4605 40.8921 40.5727 41.0133C39.4451 41.1345 39.2051 41.9587 38.8932 43.001L38.8692 43.0979C38.6293 44.0433 38.2934 45.3764 36.5179 45.5704C35.1982 45.7158 34.1905 45.0613 33.1348 44.3584C31.9111 43.5585 30.6635 42.7586 28.744 42.9525C27.5204 43.0737 26.4167 43.7039 25.6489 44.6735C24.6412 45.9582 24.1613 47.8246 24.3532 49.6669C24.4012 50.2001 24.7371 51.4121 25.241 51.8C25.313 51.8727 25.4329 51.9212 25.5529 51.8969L25.6009 52.4059C25.5769 52.4059 25.5289 52.4059 25.5049 52.4302Z"
            fill="#EC6327"
          />
          <path
            d="M118.047 59.0477C116.68 59.0719 115.36 58.4902 114.448 57.4479C113.513 56.4056 112.889 54.9027 112.697 53.2302L113.201 53.1817C113.369 54.7573 113.944 56.1389 114.808 57.1085C115.768 58.1751 117.208 58.7083 118.623 58.5144C122.894 58.0296 125.725 53.9089 127.333 50.5638L127.453 50.3214L129.54 51.5334L129.276 51.994L127.669 51.0486C125.293 55.8965 122.174 58.6599 118.671 59.0477C118.479 59.0477 118.263 59.0719 118.047 59.0477ZM103.651 52.6727C103.075 47.243 104.419 41.7648 107.418 37.2078C110.609 32.4326 115.264 29.4753 120.519 28.8693C122.678 28.6269 124.957 28.9421 126.709 29.7904C128.892 30.8085 130.164 32.5053 130.404 34.6869C130.692 37.3047 128.988 39.656 126.613 39.9226C124.118 40.2135 122.03 38.6379 121.742 36.2867L122.246 36.2139C122.486 38.3228 124.286 39.656 126.541 39.4136C128.892 39.1469 130.116 36.7957 129.9 34.7596C129.612 32.2386 127.885 30.9297 126.493 30.2752C124.813 29.4996 122.654 29.1844 120.591 29.4026C115.48 29.9844 110.945 32.8689 107.85 37.4986C104.923 41.9587 103.627 47.2915 104.179 52.6242L103.651 52.6727Z"
            fill="#EC6327"
          />
          <path
            d="M138.921 66.2713C136.282 66.2713 133.979 65.4956 132.203 64.017C130.092 62.2475 128.796 59.4842 128.412 56.0179L128.916 55.9694C129.684 62.7808 134.003 66.3925 140.505 65.6653L140.601 66.1986C140.049 66.247 139.497 66.2713 138.921 66.2713ZM142.88 61.7627L142.832 61.2537C146.887 60.7931 149.718 56.43 151.782 53.2304L151.926 53.0122L154.133 54.3454L153.845 54.7817L152.046 53.7151C149.958 56.9633 147.079 61.2779 142.88 61.7627ZM137.242 56.4542C137.122 55.0726 137.122 53.6667 137.194 52.285L137.218 51.9457L137.386 51.8729L138.394 51.4851C141.657 50.2731 146.119 48.6006 149.671 46.2251C153.845 43.4375 155.693 40.4076 155.333 37.014L155.837 36.9655C156.245 40.553 154.253 43.8011 149.958 46.6856C146.359 49.0854 141.873 50.7821 138.586 51.9941L137.722 52.3092C137.626 53.6667 137.65 55.0483 137.746 56.4057L137.242 56.4542ZM138.13 49.6914L137.626 49.6186C138.13 45.8615 139.713 34.4204 145.328 33.7901C147.127 33.5962 148.471 34.784 148.687 36.7716L148.183 36.8201C147.991 35.1233 146.887 34.1295 145.4 34.2992C140.145 34.9052 138.634 46.0312 138.13 49.6914Z"
            fill="#EC6327"
          />
          <path
            d="M163.395 64.502C161.595 64.5262 159.796 64.1626 158.116 63.4839C155.621 62.3931 154.181 60.5509 153.917 58.1512C153.773 57.1816 153.989 56.1878 154.541 55.3636C155.117 54.5637 156.029 54.0547 157.012 53.982C159.124 53.7396 160.851 55.0728 161.067 57.1089L160.564 57.1574C160.372 55.4121 158.908 54.2729 157.084 54.491C156.245 54.5395 155.477 54.9758 154.973 55.6545C154.517 56.3575 154.325 57.2301 154.445 58.0785C154.757 60.866 156.725 62.2962 158.332 62.9991C160.18 63.8233 162.651 64.1626 164.93 63.896C167.833 63.5566 170.569 62.3204 172.728 60.3328C174.336 58.8057 176.183 56.2363 175.775 52.5761L176.303 52.5276C176.639 55.5333 175.487 58.4421 173.088 60.7206C170.425 63.1688 166.994 64.502 163.395 64.502ZM164.378 51.3156C164.067 51.0005 163.731 50.7096 163.371 50.3703C160.635 47.8251 157.54 44.9406 157.132 41.2077C156.413 34.7115 162.123 30.6149 168.121 29.9362C172.344 29.4514 177.431 30.518 177.935 35.075C178.175 36.9173 176.903 38.5898 175.079 38.8322C175.031 38.8322 174.983 38.8322 174.936 38.8564C172.512 39.1231 171.313 37.0142 171.049 35.1235L171.552 35.0508C171.816 36.7961 172.824 38.5898 174.888 38.3474C176.423 38.202 177.551 36.8445 177.431 35.2932C177.431 35.2447 177.431 35.1962 177.407 35.172C176.951 31.0028 172.128 30.0574 168.169 30.4938C162.411 31.1482 156.941 35.0266 157.636 41.1834C158.02 44.7224 161.043 47.5342 163.731 50.0309C164.067 50.346 164.402 50.6611 164.738 50.9763L164.378 51.3156Z"
            fill="#EC6327"
          />
          <path
            d="M65.8617 76.9611C62.8386 76.9611 60.1513 76.0157 58.0159 74.1978C55.5446 72.0647 54.009 68.962 53.6011 65.1806L54.105 65.1321C54.5129 68.7923 55.9765 71.798 58.3518 73.8099C60.7751 75.8703 63.9423 76.7672 67.5173 76.3551C78.2183 75.1431 84.5046 63.7747 83.4729 54.3212L83.9767 54.2728C84.5286 59.2904 83.1369 64.6473 80.1378 68.962C76.9946 73.519 72.5319 76.3308 67.5653 76.8884C66.9894 76.9368 66.4136 76.9611 65.8617 76.9611ZM62.3827 69.3983C61.9268 65.3988 62.8146 59.6055 63.7743 55.5332C64.3741 52.5517 65.8138 45.5222 70.5644 44.989C71.7881 44.7951 73.0118 45.2556 73.8275 46.201C74.5233 47.0009 74.9792 48.1644 75.1472 49.4975L74.6433 49.5703C74.4993 48.334 74.0915 47.2675 73.4676 46.5646C72.7718 45.7404 71.6921 45.3526 70.6364 45.5222C66.7495 45.9586 65.2139 51.1701 64.3022 55.6787C63.3424 59.7267 62.4787 65.4472 62.9106 69.3741L62.3827 69.3983Z"
            fill="#EC6327"
          />
          <path
            d="M37.0217 32.0687L38.5333 31.899L38.6293 32.699H38.6533C38.9892 32.0445 39.613 31.6082 40.3328 31.5355C41.0766 31.4627 41.7484 31.6567 42.1563 32.3354C42.4682 31.6809 43.092 31.2446 43.8118 31.1476C45.0595 31.0022 46.0192 31.487 46.1872 33.0141L46.6191 36.9651L45.0115 37.1348L44.6276 33.7897C44.5316 32.9898 44.4117 32.3596 43.4759 32.4566C42.5402 32.5535 42.4922 33.3292 42.5642 34.0806L42.9241 37.3772L41.3165 37.5711L40.9566 34.2503C40.8847 33.5716 40.8367 32.7717 39.8289 32.8929C39.517 32.9171 38.7732 33.2322 38.8932 34.3715L39.2771 37.7893L37.6695 37.959L37.0217 32.0687Z"
            fill="white"
          />
          <path
            d="M51.2738 34.1292C51.3218 34.4928 51.3697 35.4866 50.1221 35.6321C49.5942 35.6805 49.1144 35.6078 49.0664 34.9776C49.0184 34.3473 49.4263 34.1534 49.9301 34.008C50.434 33.8626 50.9858 33.7898 51.2258 33.5232L51.2738 34.1292ZM48.9704 32.5536C48.9464 31.9234 49.3303 31.6083 49.9301 31.5598C50.506 31.4871 50.9858 31.5355 51.0578 32.2385C51.1298 32.893 50.2181 32.9657 49.2343 33.2323C48.2506 33.499 47.2909 33.911 47.4348 35.2442C47.5788 36.4562 48.5145 36.9168 49.6182 36.7956C50.314 36.7228 51.0578 36.432 51.5137 35.8502C51.5377 36.0441 51.6097 36.238 51.6817 36.4077L53.3132 36.2138C53.1452 35.9956 53.0253 35.4624 52.9533 34.9291L52.6174 31.8507C52.4494 30.4448 51.0338 30.3236 49.8582 30.469C48.5625 30.6144 47.2429 31.2204 47.3389 32.7475L48.9704 32.5536Z"
            fill="white"
          />
          <path
            d="M53.7211 30.1786L55.2327 30.0089L55.3526 31.0997H55.3766C55.6165 30.2998 56.2884 29.7423 57.1041 29.6211C57.2241 29.6211 57.3441 29.6211 57.464 29.6453L57.632 31.1482C57.44 31.124 57.2481 31.124 57.0561 31.1482C55.8805 31.2936 55.5686 32.1905 55.6885 33.2328L55.9764 35.8992L54.3689 36.0688L53.7211 30.1786Z"
            fill="white"
          />
          <path
            d="M59.1676 28.8209L58.0399 28.9421L58.9517 27.1968L60.7272 27.0029L59.1676 28.8209ZM58.1599 29.6693L59.7674 29.4754L60.4153 35.3898L58.8077 35.5595L58.1599 29.6693Z"
            fill="white"
          />
          <path
            d="M65.0939 32.554C65.1419 32.9176 65.1899 33.9114 63.9422 34.0569C63.4144 34.1053 62.9585 34.0326 62.8865 33.4024C62.8146 32.7722 63.2464 32.6025 63.7503 32.4328C64.2542 32.2631 64.806 32.2146 65.0459 31.948L65.0939 32.554ZM62.7906 31.0027C62.7906 30.3482 63.1505 30.0573 63.7503 29.9846C64.3261 29.9119 64.806 29.9604 64.878 30.6633C64.95 31.3178 64.0382 31.3905 63.0545 31.6571C62.0708 31.9238 61.111 32.3358 61.255 33.669C61.3989 34.881 62.3347 35.3416 63.4384 35.2204C64.1822 35.1719 64.854 34.8325 65.3339 34.275C65.3578 34.4689 65.4058 34.6628 65.5018 34.8325L67.1334 34.6386C66.9654 34.4204 66.8454 33.8872 66.7735 33.3539L66.4376 30.2755C66.2936 28.8696 64.854 28.7484 63.6783 28.8938C62.3587 29.0392 61.063 29.6452 61.159 31.1723L62.7906 31.0027Z"
            fill="white"
          />
          <path
            d="M72.9878 31.0025C73.1317 32.2145 72.6998 33.5962 71.3562 33.7416C69.8446 33.9113 69.1728 32.675 69.0288 31.4631C68.8849 30.1299 69.2208 28.8937 70.8044 28.724C72.148 28.5543 72.8438 29.7905 72.9878 31.0025ZM68.8849 36.6746L69.6047 36.6019L69.2448 33.3053H69.2688C69.6767 34.1052 70.5644 34.4688 71.4282 34.3718C73.2037 34.1779 73.8995 32.6266 73.7076 30.954C73.5156 29.2815 72.5079 27.9241 70.7324 28.1422C69.8446 28.215 69.0768 28.8209 68.7889 29.6693H68.7649L68.645 28.5543L67.9971 28.627L68.8849 36.6746Z"
            fill="white"
          />
          <path
            d="M75.1712 30.3479C75.1712 29.2571 75.699 28.1663 76.8507 28.0209C78.0024 27.8754 78.7942 28.8208 78.9381 29.9116L75.1712 30.3479ZM79.7299 30.4448C79.6099 28.7723 78.6742 27.221 76.8027 27.4149C74.9312 27.6088 74.3314 29.2813 74.5233 30.8327C74.7153 32.5295 75.651 33.8626 77.4985 33.6687C78.9621 33.499 79.6579 32.6264 79.8019 31.269L79.0821 31.3417C78.9621 32.2628 78.4583 32.9415 77.4026 33.0627C76.0349 33.2082 75.3631 32.0204 75.2192 30.9539L79.7299 30.4448Z"
            fill="white"
          />
          <path
            d="M84.2406 24.5303C84.2166 25.0635 83.9767 25.6695 83.3769 25.7423C83.089 25.7665 82.777 25.6938 82.5131 25.5726C82.2972 25.4756 82.0332 25.4029 81.7933 25.3787C81.4814 25.3787 81.2415 25.6453 81.2415 25.9604C81.2415 25.9847 81.2415 26.0089 81.2415 26.0331L80.8096 26.0816C80.8096 25.5241 81.0975 24.9423 81.6973 24.8696C81.9853 24.8454 82.2972 24.8939 82.5611 25.0393C82.777 25.1605 83.041 25.209 83.2809 25.209C83.6408 25.1605 83.7608 24.8939 83.8087 24.5788L84.2406 24.5303ZM80.3297 27.1966L81.0495 27.1239L81.1695 28.142H81.1935C81.3854 27.4148 82.1052 26.833 82.921 26.7361C84.5525 26.5422 85.1524 27.3663 85.3203 28.7722L85.7282 32.5536L85.0084 32.6263L84.6005 28.9419C84.4806 27.9238 84.0727 27.1966 82.921 27.3178C81.7693 27.439 81.2175 28.3844 81.3134 29.5479L81.6973 32.9899L80.9775 33.0626L80.3297 27.1966Z"
            fill="white"
          />
          <path
            d="M90.5509 29.6933C90.6949 30.8568 89.8071 31.6567 88.7274 31.7779C88.0556 31.8507 87.3838 31.4871 87.2878 30.7599C87.1678 29.5964 88.6554 29.4509 89.8551 29.0873C90.047 29.0389 90.359 28.9419 90.4309 28.7722H90.4549L90.5509 29.6933ZM87.2638 28.2389C87.1678 27.2694 87.7917 26.7846 88.6794 26.6876C89.5672 26.5906 90.239 26.7603 90.359 27.7299C90.4309 28.3844 90.119 28.5056 89.5192 28.651C88.0076 28.9904 86.424 29.2328 86.592 30.9053C86.712 32.093 87.6717 32.5294 88.7274 32.4082C89.8551 32.287 90.311 31.7779 90.7189 30.9538H90.7428C90.8148 31.584 90.9588 31.9718 91.7026 31.8991C91.8705 31.8749 92.0145 31.8506 92.1585 31.8022L92.0865 31.1962C92.0145 31.2447 91.9425 31.2689 91.8705 31.2689C91.6546 31.3174 91.4626 31.1962 91.3907 30.978C91.3907 30.9538 91.3667 30.9053 91.3907 30.8811L91.0308 27.7541C90.8628 26.1786 89.7111 25.9847 88.6794 26.1059C87.3358 26.2513 86.448 26.9542 86.544 28.3601L87.2638 28.2389Z"
            fill="white"
          />
          <path
            d="M42.0124 70.8282C38.7013 71.1918 35.1263 69.7859 34.6944 65.9803C34.1186 60.8414 38.8452 55.2663 41.7724 51.4849L41.6525 51.388C40.9567 51.7031 39.9969 52.1394 39.2291 52.2364C37.6216 52.4303 36.278 51.897 35.3422 51.994C33.6387 52.1879 34.0946 53.8847 33.4467 53.9574C32.7989 54.0301 32.391 52.6 32.343 52.0909C32.0791 49.7397 33.2548 47.1218 35.7981 46.8309C38.5573 46.5158 39.613 48.9883 41.6045 48.7701C42.7802 48.6247 43.0201 47.8248 43.212 47.0733C43.452 46.2492 43.6439 45.4977 44.6516 45.3765C45.3714 45.3038 45.8273 45.8129 45.8993 46.4916C46.0672 48.0429 40.9567 56.5025 41.6525 62.8533C41.8924 64.9379 43.38 66.9014 45.6114 66.659C49.9302 66.1742 52.4495 59.0477 51.6337 53.1817C51.3458 51.0001 50.65 48.8671 50.506 47.6066C50.362 46.3461 50.9139 44.6736 52.6174 44.4797C54.9448 44.213 55.9525 46.2492 56.1684 48.2611C57.0562 56.4541 51.1298 69.8101 42.0124 70.8282Z"
            fill="white"
          />
          <path
            d="M74.2114 43.9946C76.2029 43.7764 77.2346 45.4005 77.4266 47.1942C77.8584 51.1695 76.5388 65.0104 71.4522 65.5921C69.3408 65.8345 68.453 63.7741 68.2611 62.0531C67.9252 59.0474 68.621 54.66 69.3168 51.7513C69.8447 49.0607 70.9483 44.3582 74.2114 43.9946ZM71.9321 67.4586C79.6819 66.5859 84.8645 58.296 84.0247 50.7574C83.4249 45.2793 79.418 41.4979 73.7796 42.1281C65.8138 43.025 60.8232 51.0725 61.6869 58.8777C62.3107 64.4528 66.2936 68.0888 71.9321 67.4586Z"
            fill="white"
          />
          <path
            d="M128.436 53.5935C126.709 57.8112 123.23 61.6653 118.575 62.1744C113.273 62.7804 109.914 59.3626 109.362 54.2722C108.474 46.2732 113.513 37.6196 121.814 36.6743C124.693 36.3591 128.604 37.3772 128.988 40.8435C129.18 42.5645 128.1 44.334 126.325 44.5521C124.597 44.7461 123.086 43.728 122.894 41.9827C122.726 40.3587 123.686 39.9224 123.59 39.1467C123.518 38.4195 122.606 38.2983 121.982 38.3468C117.016 38.9043 115.672 50.7817 116.104 54.6843C116.368 56.9871 117.783 59.1444 120.375 58.8535C123.59 58.49 125.725 55.5327 127.045 52.7694L128.436 53.5935Z"
            fill="white"
          />
          <path
            d="M140.073 47.3641C140.505 44.2129 141.705 36.1411 145.664 35.7048C146.983 35.5594 147.823 36.4805 147.967 37.7652C148.447 42.1768 143.648 45.837 140.073 47.3641ZM150.63 50.1274C149.047 52.5756 146.887 55.8722 143.792 56.2115C141.417 56.4782 140.025 54.6117 139.785 52.4302C139.689 51.3636 139.689 50.2728 139.761 49.2063C144.44 47.4368 153.989 44.1887 153.293 37.8864C152.91 34.3716 148.903 33.6202 146.023 33.9595C137.458 34.9291 132.251 43.7766 133.187 52.0908C133.763 57.2296 137.05 60.0899 142.089 59.5324C146.839 58.9991 150.006 55.1208 152.118 51.0485L150.63 50.1274Z"
            fill="white"
          />
          <path
            d="M159.628 39.7291C159.076 34.8569 163.395 31.9966 167.665 31.5118C170.377 31.1967 174.408 31.7058 174.792 35.172C174.959 36.4325 174.096 37.596 172.848 37.7657C172.8 37.7657 172.776 37.7657 172.728 37.7899C171.073 37.9838 170.233 36.5537 170.017 35.1478C169.825 33.8146 169.369 33.2329 167.857 33.4025C166.082 33.5965 164.978 34.6388 165.146 36.3598C165.386 38.4201 167.258 39.7533 168.673 40.8926C171.073 42.8802 173.16 44.9164 173.52 48.213C174.048 53.0124 169.489 56.4302 165.242 56.8908C162.147 57.2301 157.612 56.2363 157.18 52.3822C157.012 50.8793 157.78 49.6431 159.316 49.4734C160.707 49.328 161.955 50.1521 162.147 51.655L162.195 52.6003L162.243 53.4972C162.387 54.7334 163.707 55.1455 164.714 55.0243C166.586 54.8062 167.857 53.0367 167.641 51.1944C167.426 49.3038 166.25 48.3584 164.954 47.1464C162.843 45.1345 159.94 42.7833 159.628 39.7291Z"
            fill="white"
          />
          <path
            d="M90.215 66.4409C87.2398 66.4409 85.1284 64.4047 84.7445 61.0839C84.4326 58.3206 85.2244 54.8543 85.8242 52.3334L86.9039 47.2915L86.9759 46.9522C87.4318 45.0857 88.4875 40.6983 88.3195 39.2682L88.8234 39.2197C88.9913 40.7468 87.9596 45.013 87.4798 47.0734L87.4078 47.4127L86.3281 52.4546C85.7522 54.9513 84.9604 58.3448 85.2484 61.0354C85.6083 64.332 87.8396 66.2227 90.9108 65.8833C96.8611 65.2046 100.316 57.957 101.828 53.6666L102.308 53.8362C100.748 58.2236 97.1731 65.6894 90.9588 66.3924C90.7189 66.4409 90.4789 66.4409 90.215 66.4409Z"
            fill="#EC6327"
          />
          <path
            d="M104.611 54.7089C103.291 58.4176 100.604 63.4836 96.2853 63.9684C93.79 64.2351 92.1105 62.6837 91.8465 60.1628C91.6306 58.1509 92.1825 55.6542 92.6383 53.6666L93.4541 49.8852C93.766 48.6005 94.6538 45.013 94.5338 43.8253C94.4378 43.0496 93.934 42.4921 93.1662 42.5648C91.5586 42.7587 89.8071 46.5644 89.1833 47.9945L88.0556 47.5097C89.6152 43.9465 92.0865 39.2925 96.3333 38.8077C98.6127 38.5653 100.532 39.753 100.796 42.2012C101.012 44.0434 100.436 46.4189 100.076 48.2854L98.6127 55.2906C98.4207 56.1633 98.0368 57.6904 98.1328 58.5872C98.2048 59.2417 98.8526 59.9204 99.5724 59.8477C101.516 59.6295 102.764 55.7997 103.555 54.2968L104.611 54.7089ZM94.8697 27.9725C94.6058 26.0091 95.9734 24.1912 97.9409 23.9245C99.8843 23.6579 101.684 25.0395 101.948 27.0272C101.948 27.0757 101.948 27.1242 101.972 27.1726C102.188 29.0633 100.82 30.9298 98.8766 31.1479C96.9331 31.3903 95.1336 30.0087 94.8937 28.021C94.8697 28.021 94.8697 27.9968 94.8697 27.9725Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="flex flex-col w-full mx-auto mb-6 border-b pb-4 border-b-[#ffffff]">
        <div className="mb-2 mx-auto flex">
          <p className="mx-auto text-sm">E-Mail:&nbsp;</p>
          <a
            className="mx-auto text-sm"
            href="mailto:info@mpvoices.com.ar"
            target="_blank"
            rel="noreferrer"
          >
            {email}
          </a>
        </div>
        <div className="mb-2 mx-auto flex">
          <p className="mx-auto text-sm">Teléfono:&nbsp;</p>
          <a
            className="mx-auto text-sm"
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noreferrer"
          >
            {tel}
          </a>
        </div>
        <div className="mb-2 mx-auto flex">
          <p className="mx-auto text-sm">Dirección:&nbsp;</p>
          <a
            className="mx-auto text-sm"
            href="https://maps.app.goo.gl/ERhpKbwzmMoBBZLy9"
            target="_blank"
            rel="noreferrer"
          >
            {dir}
          </a>
        </div>
      </div>
      <div className="flex mx-auto mb-2">
        <Link
          className="mr-1"
          href="https://www.instagram.com/mpvoices/?hl=es"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14.5883 19.6472C15.7739 19.6472 16.911 19.1762 17.7494 18.3378C18.5878 17.4994 19.0589 16.3623 19.0589 15.1766C19.0589 13.991 18.5878 12.8539 17.7494 12.0155C16.911 11.1771 15.7739 10.7061 14.5883 10.7061C13.4026 10.7061 12.2655 11.1771 11.4271 12.0155C10.5887 12.8539 10.1177 13.991 10.1177 15.1766C10.1177 16.3623 10.5887 17.4994 11.4271 18.3378C12.2655 19.1762 13.4026 19.6472 14.5883 19.6472Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.52942 19.6476V10.7064C4.52942 9.22431 5.11818 7.80292 6.16617 6.75492C7.21417 5.70692 8.63556 5.11816 10.1177 5.11816H19.0588C20.5409 5.11816 21.9623 5.70692 23.0103 6.75492C24.0583 7.80292 24.6471 9.22431 24.6471 10.7064V19.6476C24.6471 21.1297 24.0583 22.5511 23.0103 23.5991C21.9623 24.6471 20.5409 25.2358 19.0588 25.2358H10.1177C8.63556 25.2358 7.21417 24.6471 6.16617 23.5991C5.11818 22.5511 4.52942 21.1297 4.52942 19.6476Z"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M20.7353 9.04288L20.7476 9.0293"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          className="ml-1"
          href="https://www.facebook.com/mpvoices.com.ar/"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M16.1764 11.4706H21.4706L20.8823 13.8236H16.1764V24.4118H13.8235V13.8236H9.11761V11.4706H13.8235V9.26829C13.8235 7.17064 14.0423 6.40947 14.4517 5.64241C14.8529 4.88454 15.4727 4.26477 16.2306 3.86359C16.9976 3.45417 17.7588 3.23535 19.8564 3.23535C20.4706 3.23535 21.0094 3.29418 21.4706 3.41182V5.58829H19.8564C18.2988 5.58829 17.8247 5.68006 17.34 5.93888C16.992 6.12065 16.7083 6.40482 16.527 6.753C16.2682 7.23653 16.1764 7.71064 16.1764 9.26829V11.4706Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col lg:hidden">
        <p className="m-auto text-xs">© MP Voices 2022.</p>
        <p className="mx-auto text-xs">Todos los derechos reservados.</p>
      </div>
      <div className="hidden lg:flex lg:flex-col">
        <div className="flex mx-auto justify-center">
          <p className="m-auto text-xs">© MP Voices 2022.&nbsp;</p>
          <p className="m-auto text-xs">Todos los derechos reservados.</p>
        </div>
      </div>
      <div className="mx-auto my-4" onClick={scrollToTop}>
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
        >
          <path
            d="M24.0834 19.8333L17 12.75L9.91669 19.8333"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
