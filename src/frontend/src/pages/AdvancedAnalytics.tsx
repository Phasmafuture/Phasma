import HistogramChart from "@/components/charts/HistogramChart";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWorkspacePlan } from "@/hooks/useWorkspacePlan";
import {
  computeHistogramData,
  computeProjectUsage,
} from "@/lib/analytics/demoAnalytics";
import {
  getActivitySummary,
  getPerformanceSummary,
} from "@/lib/analytics/localActivityStore";
import { useDemoRuns } from "@/lib/demoRuns";
import {
  Activity,
  BarChart3,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  Maximize2,
  PlayCircle,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useMemo } from "react";

export default function AdvancedAnalytics() {
  const { isPro } = useWorkspacePlan();
  const { runs } = useDemoRuns();

  const projectUsage = useMemo(() => computeProjectUsage(runs), [runs]);
  const histogramData = useMemo(() => computeHistogramData(runs, 10), [runs]);
  const activitySummary = useMemo(() => getActivitySummary(), []);
  const performanceSummary = useMemo(() => getPerformanceSummary(), []);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Advanced Analytics
              </h1>
              <p className="text-gray-400">
                Comprehensive insights into your training runs and activity
              </p>
            </div>
            <Badge
              variant={isPro ? "default" : "outline"}
              className={
                isPro
                  ? "bg-white/20 text-white border-white/30"
                  : "border-white/30 text-gray-300"
              }
            >
              <Zap className="w-3 h-3 mr-1" />
              {isPro ? "Pro" : "Free Preview"}
            </Badge>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">Demo Mode:</span> All
              features are visible in this demo.
            </p>
          </div>
        </div>

        {/* Project Usage Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Project Usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Total Runs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {projectUsage.totalRuns}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {projectUsage.completedRuns}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-1">
                  <PlayCircle className="w-4 h-4" />
                  Running
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {projectUsage.runningRuns}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Total Episodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {projectUsage.totalEpisodes.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Histogram Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Reward &amp; Loss Distribution
          </h2>
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Episode Histogram</CardTitle>
              <CardDescription className="text-gray-400">
                Aggregated per-episode reward and loss across all stored runs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Mean Reward
                  </div>
                  <div className="text-lg font-bold text-white">
                    {histogramData.rewardStats.mean.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Median Reward
                  </div>
                  <div className="text-lg font-bold text-white">
                    {histogramData.rewardStats.median.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Max Reward
                  </div>
                  <div className="text-lg font-bold text-white">
                    {histogramData.rewardStats.max.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Mean Loss
                  </div>
                  <div className="text-lg font-bold text-white">
                    {histogramData.lossStats.mean.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Median Loss
                  </div>
                  <div className="text-lg font-bold text-white">
                    {histogramData.lossStats.median.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Max Loss
                  </div>
                  <div className="text-lg font-bold text-white">
                    {histogramData.lossStats.max.toFixed(2)}
                  </div>
                </div>
              </div>
              <HistogramChart data={histogramData} height={280} />
            </CardContent>
          </Card>
        </div>

        {/* User Activity Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            User Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Activity Summary</CardTitle>
                <CardDescription className="text-gray-400">
                  Last 24 hours (Demo data)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Page Views
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {activitySummary.byType.pageViews}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Runs Created
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {activitySummary.byType.runsCreated}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Runs Viewed
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {activitySummary.byType.runsViewed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Snapshot Exports
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {activitySummary.byType.snapshotExports}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest user actions (Demo data)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activitySummary.recentActivity.length > 0 ? (
                    activitySummary.recentActivity.slice(0, 5).map((event) => (
                      <div
                        key={`${event.type}-${event.timestamp}`}
                        className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                      >
                        <span className="text-sm text-gray-300 capitalize">
                          {event.type.replace("_", " ")}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Metrics Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Export Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {performanceSummary.successRate.toFixed(1)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {performanceSummary.totalExports} total exports
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Successful Exports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {performanceSummary.exportSuccesses}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Avg Render Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {performanceSummary.avgRenderTime > 0
                    ? `${performanceSummary.avgRenderTime.toFixed(0)}ms`
                    : "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Runs */}
        {projectUsage.recentActivity.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Training Runs
            </h2>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {projectUsage.recentActivity.map((activity) => (
                    <div
                      key={`${activity.runName}-${activity.createdAt}`}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-sm text-white">
                        {activity.runName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
