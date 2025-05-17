<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { type DataTableColumns, type PaginationProps } from 'naive-ui'
import { getMessage } from '../../hooks/useCreateDiscreteApi'
import * as packageObj from '../../../../package.json'

const props = defineProps<{
  data: ShareItem[]
}>()

const tagColorMap: Record<
  ShareTagValue,
  {
    type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
    color?: { color?: string; borderColor?: string; textColor?: string }
  }
> = {
  '720P': { type: 'default' },
  '1080P': { type: 'info' },
  '2K': { type: 'info' },
  '4K': { type: 'info' },
  '8K': { type: 'info' },
  蓝光: { type: 'info' },
  简中: { type: 'success' },
  繁中: { type: 'success' },
  英文: { type: 'warning' },
  无字幕: { type: 'error' },
  收藏级: {
    color: { color: '#F5EFF9', borderColor: 'translate', textColor: '#9b23ea' }
  }
}

const columns: DataTableColumns<ShareItem> = [
  {
    title: '分类',
    key: 'category',
    titleAlign: 'center',
    align: 'center',
    resizable: true,
    width: 100,
    maxWidth: 200,
    minWidth: 100
  },
  {
    title: '下载方式',
    key: 'type',
    titleAlign: 'center',
    align: 'center',
    resizable: true,
    width: 100,
    maxWidth: 200,
    minWidth: 100
  },
  {
    title: '名称',
    key: 'name',
    titleAlign: 'center',
    align: 'center',
    resizable: true,
    width: 200,
    maxWidth: 400,
    minWidth: 100
  },
  {
    title: '描述',
    key: 'desc',
    titleAlign: 'center',
    resizable: true,
    width: 600,
    maxWidth: 800,
    minWidth: 500,
    render: (rowData: ShareItem) => {
      return h(
        NEllipsis,
        { lineClamp: 2, tooltip: { width: 500 } },
        { default: () => rowData.desc }
      )
    }
  },
  {
    title: '标签',
    key: 'tags',
    titleAlign: 'center',
    align: 'center',
    resizable: true,
    width: 300,
    maxWidth: 400,
    minWidth: 200,
    render: (rowData: ShareItem) => {
      return h(
        NSpace,
        { size: 'small', justify: 'center' },
        {
          default: () =>
            rowData.tags?.map((tag) => {
              const colorConfig = tagColorMap[tag]
              return h(
                NTag,
                {
                  ...colorConfig,
                  size: 'small',
                  style:
                    tag === '收藏级'
                      ? {
                          textColor: '#fff',
                          backgroundImage:
                            'linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)'
                        }
                      : ''
                },
                { default: () => tag }
              )
            })
        }
      )
    }
  },
  {
    title: '哈希值',
    key: 'hash',
    titleAlign: 'center',
    resizable: true,
    width: 200,
    maxWidth: 400,
    minWidth: 200
  },
  {
    title: '操作',
    key: 'action',
    titleAlign: 'center',
    align: 'center',
    width: 100,
    render: (rowData: ShareItem) => {
      return h(
        NButton,
        {
          type: 'primary',
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => window.open(rowData.src)
        },
        { default: () => '获取资源' }
      )
    }
  }
]

const searchKeyword = ref('')

const autoCompleteOptions = ref<{ label: string; value: string }[]>([])

const searchMode = ref<'name' | 'desc' | 'all'>('name')

const debounceTime = ref(500)

const debouncedSearch = useDebounceFn((keyword: string) => {
  if (!keyword.trim() || searchMode.value !== 'name') {
    autoCompleteOptions.value = []
    return
  }

  autoCompleteOptions.value = [
    ...new Map(
      props.data
        .filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
        .map((item) => [item.name, { label: item.name, value: item.name }])
    ).values()
  ]
}, debounceTime.value)

watch([searchKeyword, searchMode], ([newVal, mode]) => {
  if (mode === 'name') {
    debouncedSearch(newVal)
  } else {
    autoCompleteOptions.value = []
  }
})

const handleSelect = (value: string) => {
  searchKeyword.value = value
  pagination.page = 1
}

const filteredData = computed(() => {
  let result = props.data
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(keyword)
      const descMatch = item.desc.toLowerCase().includes(keyword)
      return searchMode.value === 'name'
        ? nameMatch
        : searchMode.value === 'desc'
          ? descMatch
          : nameMatch || descMatch
    })
  }

  pagination.itemCount = result.length
  pagination.pageCount = Math.ceil(result.length / pagination.pageSize)

  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return result.slice(start, end)
})

const pagination = reactive<PaginationProps>({
  page: 1, // 当前页码
  pageSize: 20, // 每页显示20条数据
  pageCount: 1, // 总页数
  itemCount: 0, // 总数据量
  showSizePicker: true, // 显示每页条数选择器
  pageSizes: [10, 20, 50, 100], // 可选的每页条数
  displayOrder: ['size-picker', 'pages'],
  prefix({ itemCount }: { itemCount: number }) {
    return `共 ${itemCount} 条数据`
  },
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

const handleClick = () => {
  const message = getMessage('top')
  navigator.clipboard
    .writeText(packageObj.author.email)
    .then(() => {
      message.success('邮箱已复制')
    })
    .catch((err) => {
      message.error('复制失败: ' + err.message)
    })
}
</script>

<template>
  <div class="share-page">
    <ClientOnly>
      <!-- prettier-ignore -->
      <NMarquee class="share-marquee">
        ⚠️ 1. 当前页面显示加载、文件下载可能需要网络加速 
        ⚠️ 2. 声明：本站收录的资源链接（包括PDF、EPUB、网盘、BT等）均来源于网络公开信息，基于个人偏好整理分享。所有资源仅供学习交流使用。
        <span style="font-weight:bold;color:#d32f2f">
          • 请于下载后24小时内删除
          • 使用者需自行甄别资源合法性、安全性
          • 本站不承担任何直接或间接责任
          • 如涉及侵权请联系删除：
            <span style="color: #18A058;" @click="handleClick">
              点我复制
            </span>
        </span>
        <span style="color: red"><b> 访问即视为同意本声明。</b></span>
      </NMarquee>

      <NFlex class="share-content" justify="center">
        <NFlex class="share-flex" justify="center">
          <NInputGroup class="share-input-group">
            <NSelect
              v-model:value="searchMode"
              :options="[
                { label: '按名称搜索', value: 'name' },
                { label: '按描述搜索', value: 'desc' },
                { label: '全部搜索', value: 'all' }
              ]"
              style="width: 150px"
            />
            <NAutoComplete
              v-model:value="searchKeyword"
              :options="autoCompleteOptions"
              placeholder="输入关键词搜索资源"
              style="width: 300px"
              @update:value="handleSelect"
            />
          </NInputGroup>
        </NFlex>

        <NFlex class="share-flex">
          <NDataTable
            class="share-table"
            :columns="columns"
            :data="filteredData"
            :bordered="false"
            :single-line="false"
            :pagination="pagination"
            pagination-behavior-on-filter="first"
            remote
            size="small"
            striped
            max-height="480"
          />
        </NFlex>
      </NFlex>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.share-page {
  width: 100%;
  height: 100%;
}
.share-flex {
  margin: 10px 0;
}
.share-marquee {
  background-color: #f6e0bd;
  color: black;
}
.share-input-group {
  width: auto;
}
.share-content {
  padding: 25px;
}
.share-table :deep(.n-data-table__pagination) {
  justify-content: center;
}
</style>
