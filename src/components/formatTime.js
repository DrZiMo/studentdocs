import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatTime = (timestamp) => {
    const now = dayjs()
    const givenTime = dayjs(timestamp)
    const diffInHours = now.diff(givenTime, 'hour')

    if (diffInHours < 24) {
        return givenTime.fromNow()
    } else {
        return givenTime.format('YYYY-MM-DD')
    }
}
