<template>
  <div>
    <Row :gutter="20">
      <i-col span="24">
        <Card :bordered="false" dis-hover>
          <template #title>
            <p>{{ env.APP_TITLE }}</p>
          </template>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'env']),
  },
  data () {
    return {}
  }
}
</script>
