<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import TRC from '@/components/Dashboard/RightClick.vue'
import Toolbar from '@/components/Dashboard/Toolbar.vue'
import GridView from '@/components/Dashboard/Views/Grid/GridView.vue'
import ListView from '@/components/Dashboard/Views/List/ListView.vue'
import TableView from '@/components/Dashboard/Views/Table/TableView.vue'
import ConfirmDeleteDialog from '@/components/Dialogs/Confirm/ConfirmDeleteDialog.vue'
import { useI18nUtils } from '@/composables'
import { DashboardDisplayMode } from '@/constants/vuetorrent'
import { doesCommand } from '@/helpers'
import { useDashboardStore, useDialogStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { RightClickProperties, Torrent as TorrentType } from '@/types/vuetorrent'

const { height: deviceHeight, mdAndDown } = useDisplay()
const { t } = useI18nUtils()
const router = useRouter()
const dashboardStore = useDashboardStore()
const { paginatedTorrents, currentPage, pageCount, isSelectionMultiple, selectedTorrents, displayMode } = storeToRefs(dashboardStore)
const dialogStore = useDialogStore()
const torrentStore = useTorrentStore()
const { processedTorrents: torrents } = storeToRefs(torrentStore)
const { isInfiniteScrollActive } = storeToRefs(useVueTorrentStore())

const isListView = computed(() => displayMode.value === DashboardDisplayMode.LIST)
const isGridView = computed(() => displayMode.value === DashboardDisplayMode.GRID)
const isTableView = computed(() => displayMode.value === DashboardDisplayMode.TABLE)

const isAllTorrentsSelected = computed(() => torrents.value.length <= selectedTorrents.value.length)
const rightClickProperties = ref<RightClickProperties>({
  target: '',
  isVisible: false,
  offset: [0, 0],
})

const height = computed(() => {
  // 64px for the topbar
  // 8px for the top padding
  // 56px for the filter text field (only on xs/sm device)
  // 56px for the toolbar
  // 48px for the multiple selection row
  // 8px for the pagination margin
  // 58px for the bottom pagination
  return Math.max(
    150,
    deviceHeight.value -
      64 -
      8 -
      (mdAndDown.value ? 56 : 0) -
      56 -
      (dashboardStore.isSelectionMultiple ? 48 : 0) -
      8 -
      (!isInfiniteScrollActive.value && pageCount.value > 1 ? 58 : 0)
  )
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleSearchFilter(forceState?: boolean) {
  if (forceState) {
    return nextTick(() => {
      const searchInput = document.getElementById('searchInput')
      searchInput?.focus()
    })
  }
  void nextTick(() => {
    const searchInput = document.getElementById('searchInput')
    searchInput?.blur()
  })
}

function toggleSelectAll() {
  if (isAllTorrentsSelected.value) {
    dashboardStore.unselectAllTorrents()
  } else {
    dashboardStore.selectTorrents(...torrents.value.map(t => t.hash))
  }
}

function goToInfo(torrent: TorrentType) {
  if (!isSelectionMultiple.value) {
    void router.push({ name: 'torrentDetail', params: { hash: torrent.hash } })
  }
}

function onTorrentClick(e: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }, torrent: TorrentType) {
  if (e.shiftKey) {
    dashboardStore.spanTorrentSelection(torrent.hash)
  } else if (doesCommand(e) || dashboardStore.isSelectionMultiple) {
    dashboardStore.isSelectionMultiple = true
    dashboardStore.toggleSelect(torrent.hash)
  }
}

async function onTorrentRightClick(e: MouseEvent, torrent: TorrentType) {
  if (rightClickProperties.value.isVisible) {
    rightClickProperties.value.isVisible = false
    await nextTick()
  }

  rightClickProperties.value = {
    target: torrent.hash,
    isVisible: true,
    offset: [e.pageX, e.pageY],
  }

  if (!isSelectionMultiple.value) {
    dashboardStore.unselectAllTorrents()
    dashboardStore.selectTorrent(torrent.hash)
  } else if (selectedTorrents.value.length === 0) {
    dashboardStore.selectTorrent(torrent.hash)
  }
}

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog) {
    return false
  }

  const targetNode = e.target as Element

  // 'ctrl + A' => select torrents
  if (doesCommand(e) && e.key === 'a' && targetNode.tagName !== 'INPUT') {
    dashboardStore.selectAllTorrents()
    e.preventDefault()
    return true
  }

  // 'ctrl + F' => Focus search filter field
  if (doesCommand(e) && e.key === 'f') {
    const searchInput = document.getElementById('searchInput')
    if (document.activeElement !== searchInput) {
      void toggleSearchFilter(true)
      e.preventDefault()
      return true
    }
  }

  // 'Escape' => Remove focus from search field / unselect all torrents
  if (e.key === 'Escape') {
    const searchInput = document.getElementById('searchInput')
    if (document.activeElement === searchInput) {
      void toggleSearchFilter(false)
    } else {
      isSelectionMultiple.value = false
      dashboardStore.unselectAllTorrents()
    }
    e.preventDefault()
    return true
  }

  // 'Delete' => Open delete dialog
  if (e.key === 'Delete') {
    if (selectedTorrents.value.length === 0) return

    const searchInput = document.getElementById('searchInput')
    if (document.activeElement !== searchInput) {
      dialogStore.createDialog(ConfirmDeleteDialog, { hashes: selectedTorrents.value })
      e.preventDefault()
    }
    return true
  }

  // 'Search' => Search view
  if (e.key === '/') {
    const searchInput = document.getElementById('searchInput')
    if (document.activeElement !== searchInput) {
      void router.push({ name: 'searchEngine' })
      e.preventDefault()
    }
    return true
  }
}

watch(
  () => rightClickProperties.value.isVisible,
  newValue => {
    if (!newValue && !isSelectionMultiple.value) {
      dashboardStore.unselectAllTorrents()
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>

<template>
  <div class="pt-2 px-1 px-sm-4">
    <Toolbar />

    <v-row class="ma-0 pa-0">
      <v-expand-transition>
        <v-card v-show="isSelectionMultiple" color="transparent" flat>
          <v-tooltip :text="t('common.selectAll')" location="bottom">
            <template #activator="{ props }">
              <v-btn
                :icon="isAllTorrentsSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                class="text-grey"
                flat
                color="transparent"
                style="left: -8px"
                v-bind="props"
                @click="toggleSelectAll" />
            </template>
          </v-tooltip>
          <span class="text-grey">{{ t('dashboard.selectAll') }}</span>
        </v-card>
      </v-expand-transition>
    </v-row>

    <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
      <p class="text-grey">
        {{ t('common.emptyList') }}
      </p>
    </div>

    <ListView
      v-else-if="isListView"
      :height="height"
      :paginated-torrents="paginatedTorrents"
      @on-checkbox-click="onTorrentClick"
      @on-torrent-click="onTorrentClick"
      @on-torrent-dbl-click="goToInfo"
      @on-torrent-right-click="onTorrentRightClick" />
    <GridView
      v-else-if="isGridView"
      :height="height"
      :paginated-torrents="paginatedTorrents"
      @on-checkbox-click="onTorrentClick"
      @on-torrent-click="onTorrentClick"
      @on-torrent-dbl-click="goToInfo"
      @on-torrent-right-click="onTorrentRightClick" />
    <TableView
      v-else-if="isTableView"
      :height="height"
      :paginated-torrents="paginatedTorrents"
      @on-checkbox-click="onTorrentClick"
      @on-torrent-click="onTorrentClick"
      @on-torrent-dbl-click="goToInfo"
      @on-torrent-right-click="onTorrentRightClick" />

    <div v-if="!isInfiniteScrollActive && pageCount > 1">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="scrollToTop" />
    </div>
  </div>

  <TRC v-model="rightClickProperties" />
</template>
